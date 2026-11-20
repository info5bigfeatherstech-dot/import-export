import { useState, useEffect, useCallback } from "react";
import type { AdminProduct } from "../types/adminProduct";
import {
  getStoredProducts,
  saveStoredProducts,
  getStoredFactories,
  saveStoredFactories,
  getStoredCustomers,
  saveStoredCustomers,
} from "../utils/adminStorage";
import { api, type ApiCategory, type DashboardSummary } from "../lib/api";
import {
  apiProductToAdminProduct,
  adminProductToApiPayload,
} from "../utils/productAdapter";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import AdminStats from "../components/admin/AdminStats";
import AdminDashboardView from "../components/admin/AdminDashboardView";
import AdminProductTable from "../components/admin/AdminProductTable";
import AdminProductModal from "../components/admin/AdminProductModal";
import AdminProductDetailModal from "../components/admin/AdminProductDetailModal";
import AdminFactoryView from "../components/admin/AdminFactoryView";
import AdminCustomerView from "../components/admin/AdminCustomerView";
import AdminCategoryView from "../components/admin/AdminCategoryView";
import AdminBulkListingModal from "../components/admin/AdminBulkListingModal";
import { countAllCategories } from "../utils/categoryUtils";
import { FiCheckCircle, FiInfo, FiTrash2, FiAlertCircle } from "react-icons/fi";

export default function AdminPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [factories, setFactories] = useState<string[]>([]);
  const [customers, setCustomers] = useState<string[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [dashboardSummary, setDashboardSummary] =
    useState<DashboardSummary | null>(null);

  const [currentTab, setCurrentTab] = useState<string>("dashboard");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isBulkListingOpen, setIsBulkListingOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(
    null,
  );
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [detailProduct, setDetailProduct] = useState<AdminProduct | null>(null);

  // Sync state
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type?: "success" | "error" | "info";
  } | null>(null);

  const showToast = (
    text: string,
    type: "success" | "error" | "info" = "success",
  ) => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const refreshCategories = useCallback(async () => {
    const catRes = await api.categories.list();
    if (catRes.data && Array.isArray(catRes.data)) {
      setCategories(catRes.data);
    }
  }, []);

  // Load and sync from Backend API
  const syncWithApi = useCallback(async (notify = false) => {
    setIsSyncing(true);
    try {
      // 1. Categories
      try {
        await refreshCategories();
      } catch (e) {
        console.warn("Could not fetch categories from API:", e);
      }

      // 2. Dashboard summary
      try {
        const sumRes = await api.dashboard.getSummary();
        if (sumRes.data) {
          setDashboardSummary(sumRes.data);
        }
      } catch (e) {
        console.warn("Could not fetch dashboard summary:", e);
      }

      // 3. Products from API
      let liveProducts: AdminProduct[] = [];
      const prodRes = await api.products.list({ includeInactive: true });
      if (
        prodRes.data &&
        Array.isArray(prodRes.data) &&
        prodRes.data.length > 0
      ) {
        liveProducts = prodRes.data.map(apiProductToAdminProduct);
        setProducts(liveProducts);
        saveStoredProducts(liveProducts);
        if (notify) {
          showToast(`Synced ${liveProducts.length} products successfully!`);
        }
      } else {
        const loaded = getStoredProducts();
        liveProducts = loaded;
        setProducts(loaded);
        if (notify) {
          showToast("Catalog is currently empty.", "info");
        }
      }

      // 4. Factories from API and Live Products
      let apiFactoryNames: string[] = [];
      try {
        const factRes = await api.factories.list();
        if (
          factRes.data &&
          Array.isArray(factRes.data) &&
          factRes.data.length > 0
        ) {
          apiFactoryNames = factRes.data.map((f) => f.name).filter(Boolean);
        }
      } catch (e) {
        console.warn("Could not fetch factories:", e);
      }

      // Extract factories from actual live catalog products
      const productFactoryNames = liveProducts
        .map((p) => p.factoryName?.trim())
        .filter((name): name is string => Boolean(name));

      // ONLY keep factories that actually come from the API or live products
      const validFactories = Array.from(
        new Set([...apiFactoryNames, ...productFactoryNames])
      );
      setFactories(validFactories);
      saveStoredFactories(validFactories);

      // 5. Customers from API and Live Products
      let apiCustomerNames: string[] = [];
      try {
        const custRes = await api.customers.list();
        if (
          custRes.data &&
          Array.isArray(custRes.data) &&
          custRes.data.length > 0
        ) {
          apiCustomerNames = custRes.data.map((c) => c.name).filter(Boolean);
        }
      } catch (e) {
        console.warn("Could not fetch customers:", e);
      }

      // Extract customers from actual live catalog products
      const productCustomerNames = liveProducts
        .map((p) => p.customerName?.trim())
        .filter((name): name is string => Boolean(name));

      // ONLY keep clients that actually come from the API or live products
      const validCustomers = Array.from(
        new Set([...apiCustomerNames, ...productCustomerNames])
      );
      setCustomers(validCustomers);
      saveStoredCustomers(validCustomers);
    } catch (err: any) {
      console.warn("Sync notice:", err);
      // Fallback to local storage
      const loadedProducts = getStoredProducts();
      const loadedFactories = getStoredFactories();
      const loadedCustomers = getStoredCustomers();
      setProducts(loadedProducts);
      setFactories(loadedFactories);
      setCustomers(loadedCustomers);
      if (notify) {
        showToast("Working offline with cached data.", "info");
      }
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    syncWithApi(false);
  }, [syncWithApi]);

  // Get default category ID for creating products
  const getDefaultCategoryId = (): string => {
    if (categories.length > 0) {
      // Find Garments or first
      const garmentCat = categories.find(
        (c) =>
          c.slug === "garments" || c.name.toLowerCase().includes("garment"),
      );
      return garmentCat ? garmentCat.id : categories[0].id;
    }
    // Fallback known Garments ID from MongoDB
    return "6b0009b601475ad9dd4d72d2";
  };

  // Save product (create or update)
  const handleSaveProduct = async (updated: AdminProduct) => {
    const exists = products.some((p) => p.id === updated.id);
    const categoryId = getDefaultCategoryId();

    try {
      if (exists) {
        // Update product via API if valid id
        const isMongoId = /^[0-9a-fA-F]{24}$/.test(updated.id);
        if (isMongoId) {
          const payload = adminProductToApiPayload(updated, categoryId);
          await api.products.update(updated.id, payload);
        }
        const nextList = products.map((p) =>
          p.id === updated.id ? updated : p,
        );
        setProducts(nextList);
        saveStoredProducts(nextList);
        showToast(
          `Updated product "${updated.productName}" (${updated.productCode})`,
        );
      } else {
        // Create new product via API
        const payload = adminProductToApiPayload(updated, categoryId);
        let newProdItem = updated;
        try {
          const res = await api.products.create(payload);
          if (res?.data) {
            newProdItem = apiProductToAdminProduct(res.data);
          }
        } catch (apiErr: any) {
          console.warn("API product creation notice:", apiErr);
        }

        const nextList = [newProdItem, ...products];
        setProducts(nextList);
        saveStoredProducts(nextList);
        showToast(
          `Created new product "${updated.productName}" (${updated.productCode})`,
        );
      }
    } catch (err: any) {
      showToast(err?.message || "Error saving product", "error");
    }

    setEditingProduct(null);
  };

  // Delete product
  const handleDeleteProduct = async (id: string) => {
    const target = products.find((p) => p.id === id);
    if (
      window.confirm(
        `Are you sure you want to delete product ${target?.productCode || id}?`,
      )
    ) {
      try {
        const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);
        if (isMongoId) {
          await api.products.delete(id);
        }
      } catch (err: any) {
        console.warn("API delete warning:", err);
      }

      const nextList = products.filter((p) => p.id !== id);
      setProducts(nextList);
      saveStoredProducts(nextList);
      setSelectedIds((prev) => prev.filter((i) => i !== id));
      showToast(`Deleted product ${target?.productCode || id}`);
    }
  };

  // Duplicate product
  const handleDuplicateProduct = async (original: AdminProduct) => {
    const currentYearDigits = new Date().getFullYear().toString().slice(-2);
    const newCode = `ST-${1000 + products.length + 1}`;
    const duplicated: AdminProduct = {
      ...original,
      id: `prod-${Date.now()}`,
      productCode: newCode,
      sku: `${original.sku}-COPY`,
      purchaseCode: `PUR-${(products.length + 1).toString().padStart(3, "0")}`,
      productName: `${original.productName} (Copy)`,
      factoryCode: `F${currentYearDigits}-${(products.length + 1).toString().padStart(3, "0")}`,
      customerStyleCode: `C${currentYearDigits}-${(products.length + 1).toString().padStart(3, "0")}`,
      createdAtDate: `${new Date().toLocaleString("default", { month: "long" })} ${new Date().getFullYear()}`,
      updatedAtDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
    };

    // Try saving duplicated item to backend API
    try {
      const payload = adminProductToApiPayload(
        duplicated,
        getDefaultCategoryId(),
      );
      const res = await api.products.create(payload);
      if (res?.data) {
        const mapped = apiProductToAdminProduct(res.data);
        const nextList = [mapped, ...products];
        setProducts(nextList);
        saveStoredProducts(nextList);
        showToast(
          `Duplicated ${original.productCode} as ${newCode} (synced to server)`,
        );
        return;
      }
    } catch {
      // local save fallback
    }

    const nextList = [duplicated, ...products];
    setProducts(nextList);
    saveStoredProducts(nextList);
    showToast(`Duplicated ${original.productCode} as ${newCode}`);
  };

  // Bulk Delete
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Delete ${selectedIds.length} selected products?`)) {
      for (const id of selectedIds) {
        if (/^[0-9a-fA-F]{24}$/.test(id)) {
          try {
            await api.products.delete(id);
          } catch {
            // continue
          }
        }
      }
      const nextList = products.filter((p) => !selectedIds.includes(p.id));
      setProducts(nextList);
      saveStoredProducts(nextList);
      showToast(`Removed ${selectedIds.length} products`);
      setSelectedIds([]);
    }
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = [
      "Product Code",
      "SKU",
      "Purchase Code",
      "Product Name",
      "Product Type",
      "Variant",
      "Gender",
      "Age Group",
      "Category",
      "Subcategory",
      "Collection",
      "Season",
      "Development Date",
      "Shipment Date",
      "Fabric",
      "Fabric Composition",
      "GSM",
      "Pattern",
      "Color",
      "Available Colors",
      "Size Range",
      "MOQ",
      "Quantity Unit",
      "Market Suitability",
      "Factory Code",
      "Factory Name",
      "Factory Price (EXW)",
      "Sale Price",
      "FOB Price",
      "FOB Port",
      "Ready Stock Availability",
      "Ready Stock Quantity",
      "Ready Stock Quantity Unit",
      "Customer Name",
      "Customer Style Code",
      "Repeat Order",
      "Repeat Order Number",
      "Product Status",
      "Featured Product",
      "Created At",
      "Updated At",
    ];

    const rows = products.map((p) => [
      `"${p.productCode}"`,
      `"${p.sku}"`,
      `"${p.purchaseCode}"`,
      `"${(p.productName || "").replace(/"/g, '""')}"`,
      `"${p.productType}"`,
      `"${p.variant}"`,
      `"${p.gender}"`,
      `"${p.ageGroup}"`,
      `"${p.category}"`,
      `"${p.subcategory}"`,
      `"${p.collection}"`,
      `"${p.season}"`,
      `"${p.developmentDate}"`,
      `"${p.shipmentDate}"`,
      `"${p.fabric}"`,
      `"${p.fabricComposition}"`,
      `"${p.gsm}"`,
      `"${p.pattern}"`,
      `"${p.color}"`,
      `"${p.availableColors?.join(", ") || ""}"`,
      `"${p.sizeRange?.join(", ") || ""}"`,
      `"${p.moq}"`,
      `"${p.quantityUnit}"`,
      `"${p.marketSuitability?.join(", ") || ""}"`,
      `"${p.factoryCode}"`,
      `"${p.factoryName}"`,
      `"${p.factoryPriceExw}"`,
      `"${p.salePrice}"`,
      `"${p.fobPrice}"`,
      `"${p.fobPort}"`,
      `"${p.readyStockAvailability}"`,
      `"${p.readyStockQuantity}"`,
      `"${p.readyStockQuantityUnit}"`,
      `"${p.customerName}"`,
      `"${p.customerStyleCode}"`,
      `"${p.repeatOrder}"`,
      `"${p.repeatOrderNumber || ""}"`,
      `"${p.productStatus}"`,
      `"${p.featuredProduct}"`,
      `"${p.createdAtDate}"`,
      `"${p.updatedAtDate}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `shivasun_product_master_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Exported complete product dataset to CSV");
  };

  // Add Factory
  const handleAddNewFactory = async (name: string) => {
    const trimmed = name.trim();
    if (!factories.includes(trimmed)) {
      try {
        await api.factories.create({ name: trimmed });
      } catch (err: any) {
        console.warn("Factory API warning:", err);
      }
      const next = [...factories, trimmed];
      setFactories(next);
      saveStoredFactories(next);
      showToast(`Added manufacturing partner: ${trimmed}`);
    }
  };

  // Add Customer
  const handleAddNewCustomer = async (name: string) => {
    const trimmed = name.trim();
    if (!customers.includes(trimmed)) {
      try {
        await api.customers.create({ name: trimmed });
      } catch (err: any) {
        console.warn("Customer API warning:", err);
      }
      const next = [...customers, trimmed];
      setCustomers(next);
      saveStoredCustomers(next);
      showToast(`Added client account: ${trimmed}`);
    }
  };

  return (
    <div className="h-screen w-full bg-slate-50/50 flex overflow-hidden font-[Inter,system-ui,sans-serif] text-slate-800 antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 text-white text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-200 ${
            toastMessage.type === "error"
              ? "bg-rose-900 border border-rose-700"
              : toastMessage.type === "info"
                ? "bg-slate-800 border border-slate-700"
                : "bg-slate-900 border border-slate-800"
          }`}
        >
          {toastMessage.type === "error" ? (
            <FiAlertCircle size={15} className="text-rose-400 shrink-0" />
          ) : (
            <FiCheckCircle size={15} className="text-emerald-400 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Left Sidebar */}
      <AdminSidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        productCount={products.length}
        categoryCount={countAllCategories(categories)}
        onAddNew={() => {
          setEditingProduct(null);
          setIsModalOpen(true);
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1 h-screen flex flex-col min-w-0 overflow-hidden">
        <AdminHeader
          onAddNew={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          onExportCsv={handleExportCsv}
          onBulkListing={() => setIsBulkListingOpen(true)}
          totalCount={products.length}
          currentTab={currentTab}
        />

        <main className="flex-1 overflow-y-auto p-6 w-full space-y-6">
          {/* Top Key Statistics Bar - only shown on Product Catalog */}
          {currentTab === "products" && <AdminStats products={products} />}

          {/* TAB 0: EXECUTIVE DASHBOARD */}
          {currentTab === "dashboard" && (
            <AdminDashboardView
              products={products}
              summary={dashboardSummary}
              onNavigateTab={setCurrentTab}
              onRefresh={() => syncWithApi(true)}
              isSyncing={isSyncing}
            />
          )}

          {/* Bulk Selection Bar if any checked */}
          {selectedIds.length > 0 && (
            <div className="p-3 bg-navy/5 border border-navy/20 rounded-xl flex items-center justify-between text-xs animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-navy font-medium">
                <FiInfo className="text-navy" size={15} />
                <span>
                  <strong>{selectedIds.length}</strong> products selected across
                  the table
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FiTrash2 size={13} />
                  <span>Delete Selected</span>
                </button>
                <button
                  onClick={() => setSelectedIds([])}
                  className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Deselect All
                </button>
              </div>
            </div>
          )}

          {/* TAB 1: PRODUCT CATALOG TABLE */}
          {currentTab === "products" && (
            <AdminProductTable
              products={products}
              onView={(p) => {
                setDetailProduct(p);
                setIsDetailOpen(true);
              }}
              onEdit={(p) => {
                setEditingProduct(p);
                setIsModalOpen(true);
              }}
              onDuplicate={handleDuplicateProduct}
              onDelete={handleDeleteProduct}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          )}

          {/* TAB 1.5: CATEGORY HIERARCHY */}
          {currentTab === "categories" && (
            <AdminCategoryView
              categories={categories}
              products={products}
              onRefreshCategories={refreshCategories}
              onViewProduct={(p) => {
                setDetailProduct(p);
                setIsDetailOpen(true);
              }}
              showToast={showToast}
            />
          )}

          {/* TAB 3: FACTORIES VIEW */}
          {currentTab === "factories" && (
            <AdminFactoryView
              products={products}
              factories={factories}
              onAddNewFactory={handleAddNewFactory}
            />
          )}

          {/* TAB 4: CLIENTS VIEW */}
          {currentTab === "customers" && (
            <AdminCustomerView
              products={products}
              customers={customers}
              onAddNewCustomer={handleAddNewCustomer}
            />
          )}
        </main>
      </div>

      {/* Product Add / Edit Modal */}
      <AdminProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        initialProduct={editingProduct}
        existingProducts={products}
        factories={factories}
        customers={customers}
        onAddNewFactory={handleAddNewFactory}
        onAddNewCustomer={handleAddNewCustomer}
      />

      {/* Product Detail Spec Sheet Modal */}
      <AdminProductDetailModal
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setDetailProduct(null);
        }}
        product={detailProduct}
        onEdit={(p) => {
          setIsDetailOpen(false);
          setEditingProduct(p);
          setIsModalOpen(true);
        }}
      />

      {/* Bulk Product Listing Studio Modal */}
      <AdminBulkListingModal
        isOpen={isBulkListingOpen}
        onClose={() => setIsBulkListingOpen(false)}
        onSuccess={async () => {
          await syncWithApi(true);
        }}
        showToast={showToast}
      />
    </div>
  );
}
