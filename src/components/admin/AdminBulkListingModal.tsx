import { useState, useRef } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { api } from '../../lib/api'
import {
  FiUploadCloud,
  FiFileText,
  FiArchive,
  FiDownload,
  FiCheckCircle,
  FiAlertCircle,
  FiX,
  FiCheck,
  FiInfo,
} from 'react-icons/fi'

interface AdminBulkListingModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => Promise<void>
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void
}

interface PreviewSummary {
  rows: number
  families: number
  ok: number
  failed: number
}

interface PreviewRow {
  row: number
  productCode: string
  familyCode: string
  name: string
  title: string
  categoryPath: string
  attributes: string
  ok: boolean
  issues: string[]
}

interface PreviewIssue {
  row?: number
  productCode?: string
  familyCode?: string
  source?: string
  reason?: string
}

export default function AdminBulkListingModal({
  isOpen,
  onClose,
  onSuccess,
  showToast,
}: AdminBulkListingModalProps) {
  const [sheetFile, setSheetFile] = useState<File | null>(null)
  const [zipFile, setZipFile] = useState<File | null>(null)

  // Preview state
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [previewSummary, setPreviewSummary] = useState<PreviewSummary | null>(null)
  const [previewRows, setPreviewRows] = useState<PreviewRow[]>([])
  const [previewIssues, setPreviewIssues] = useState<PreviewIssue[]>([])

  // Import execution state
  const [isImporting, setIsImporting] = useState(false)
  const [importResult, setImportResult] = useState<any | null>(null)
  const [isDownloadingTemplate, setIsDownloadingTemplate] = useState(false)

  const sheetInputRef = useRef<HTMLInputElement>(null)
  const zipInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  // Handle Sheet Selection
  const handleSheetChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSheetFile(file)
    setPreviewSummary(null)
    setPreviewRows([])
    setPreviewIssues([])
    setImportResult(null)
  }

  // Handle Zip Selection
  const handleZipChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setZipFile(file)
  }

  // Download official CSV template from backend
  const handleDownloadTemplate = async () => {
    setIsDownloadingTemplate(true)
    try {
      await api.products.downloadTemplate()
      showToast('Downloaded official bulk listing template (CSV)')
    } catch {
      // Fallback: build client-side template download
      const headers = [
        'productCode',
        'name',
        'title',
        'description',
        'categoryPath',
        'moq',
        'fabric',
        'fabricComposition',
        'gsm',
        'pattern',
        'fobPort',
        'gender',
        'productType',
        'productStatus',
        'quantityUnit',
        'color',
        'attributes',
      ].join(',')
      const sampleRow =
        'TST-901-1,Cotton Hoodie,Cotton Hoodie — Red,"Soft cotton fleece hoodie for export buyers.",Garments / Women / Women\'s Sweat Tops & Hoodies,300,Cotton Fleece,80% Cotton 20% Polyester,320,Solid,Mundra,Women,New Developed,Active,Pcs,Red,"Color=Red; Size=XS, SM, L"'
      const blob = new Blob([`\uFEFF${headers}\r\n${sampleRow}\r\n`], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'maya-exports-product-import.csv'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      showToast('Downloaded bulk listing template')
    } finally {
      setIsDownloadingTemplate(false)
    }
  }

  // Preview and validate spreadsheet
  const handlePreviewSheet = async () => {
    if (!sheetFile) {
      showToast('Please select a CSV or Excel spreadsheet first', 'error')
      return
    }

    setIsPreviewing(true)
    try {
      const res = await api.products.previewImport(sheetFile)
      if (res.data) {
        setPreviewSummary(res.data.summary)
        setPreviewRows(res.data.rows || [])
        setPreviewIssues(res.data.issues || [])
        showToast(res.message || 'Spreadsheet analyzed successfully')
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to analyze spreadsheet', 'error')
    } finally {
      setIsPreviewing(false)
    }
  }

  // Execute full bulk import
  const handleExecuteImport = async (e: FormEvent) => {
    e.preventDefault()
    if (!sheetFile) {
      showToast('Please select a spreadsheet (.csv or .xlsx)', 'error')
      return
    }

    setIsImporting(true)
    try {
      // If no ZIP is provided, create a dummy empty ZIP archive so backend accepts the request
      let effectiveZip = zipFile
      if (!effectiveZip) {
        const emptyZipBytes = new Uint8Array([0x50, 0x4b, 0x05, 0x06, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
        effectiveZip = new File([emptyZipBytes], 'empty.zip', { type: 'application/zip' })
      }

      const res = await api.products.importBulk(sheetFile, effectiveZip)
      setImportResult(res.data)
      showToast(res.message || 'Bulk listing completed!')
      await onSuccess()
    } catch (err: any) {
      showToast(err.message || 'Bulk listing import failed', 'error')
    } finally {
      setIsImporting(false)
    }
  }

  const handleReset = () => {
    setSheetFile(null)
    setZipFile(null)
    setPreviewSummary(null)
    setPreviewRows([])
    setPreviewIssues([])
    setImportResult(null)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-none animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-navy text-white flex items-center justify-center shadow-xs">
              <FiUploadCloud size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-none">
                Bulk Product Listing Studio
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Upload CSV or Excel spreadsheets to list multiple products simultaneously.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Step 1: Template Download Banner */}
          <div className="p-4 rounded-xl border border-navy/15 bg-navy/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-navy uppercase tracking-wider">
                  Step 1: Download Standard Template
                </span>
                <span className="text-[10px] bg-navy/10 text-navy px-2 py-0.5 rounded-full font-semibold">
                  17 Fields
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Download the official Excel/CSV format with productCode, title, fabric specs, category path, MOQ, and variant attributes.
              </p>
            </div>

            <button
              onClick={handleDownloadTemplate}
              disabled={isDownloadingTemplate}
              className="px-3.5 py-2 bg-navy hover:bg-navy-light text-white text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
            >
              <FiDownload size={13} className={isDownloadingTemplate ? 'animate-bounce' : ''} />
              <span>{isDownloadingTemplate ? 'Downloading...' : 'Download Template (.csv)'}</span>
            </button>
          </div>

          {/* Step 2: Upload Files */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Step 2: Select Files for Bulk Listing
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* File 1: Spreadsheet */}
              <div
                onClick={() => sheetInputRef.current?.click()}
                className={`p-4 rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-2 min-h-[140px] ${
                  sheetFile
                    ? 'border-emerald-400 bg-emerald-50/40'
                    : 'border-slate-300 hover:border-navy/50 bg-slate-50/50'
                }`}
              >
                <input
                  ref={sheetInputRef}
                  type="file"
                  accept=".csv, .xlsx, .xls"
                  onChange={handleSheetChange}
                  className="hidden"
                />

                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    sheetFile ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  <FiFileText size={20} />
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-800">
                    {sheetFile ? sheetFile.name : 'Select Product Spreadsheet *'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {sheetFile
                      ? `${(sheetFile.size / 1024).toFixed(1)} KB • Click to change`
                      : 'Accepts .csv, .xlsx, or .xls format'}
                  </div>
                </div>

                {sheetFile && (
                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                    <FiCheck size={11} /> File Loaded
                  </span>
                )}
              </div>

              {/* File 2: Images ZIP (Optional) */}
              <div
                onClick={() => zipInputRef.current?.click()}
                className={`p-4 rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-2 min-h-[140px] ${
                  zipFile
                    ? 'border-sky-400 bg-sky-50/40'
                    : 'border-slate-300 hover:border-navy/50 bg-slate-50/50'
                }`}
              >
                <input
                  ref={zipInputRef}
                  type="file"
                  accept=".zip"
                  onChange={handleZipChange}
                  className="hidden"
                />

                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    zipFile ? 'bg-sky-100 text-sky-700' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  <FiArchive size={20} />
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-800">
                    {zipFile ? zipFile.name : 'Images ZIP Archive (Optional)'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {zipFile
                      ? `${(zipFile.size / (1024 * 1024)).toFixed(2)} MB • Click to change`
                      : 'Contains photo folders named by productCode'}
                  </div>
                </div>

                {zipFile ? (
                  <span className="text-[10px] text-sky-700 font-semibold flex items-center gap-1">
                    <FiCheck size={11} /> ZIP Archive Ready
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400">Can import without images</span>
                )}
              </div>
            </div>
          </div>

          {/* Step 3: Validate & Preview Button */}
          {sheetFile && !previewSummary && !importResult && (
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-600 flex items-center gap-2">
                <FiInfo size={14} className="text-navy shrink-0" />
                <span>Validate spreadsheet structure and test row formats before importing.</span>
              </div>

              <button
                type="button"
                onClick={handlePreviewSheet}
                disabled={isPreviewing}
                className="px-4 py-1.5 bg-navy/10 hover:bg-navy/20 text-navy text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                {isPreviewing ? 'Validating...' : 'Analyze & Preview'}
              </button>
            </div>
          )}

          {/* Preview Results Summary */}
          {previewSummary && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Spreadsheet Analysis Preview
              </span>

              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase">Rows</div>
                  <div className="text-lg font-bold text-slate-800">{previewSummary.rows}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase">Families</div>
                  <div className="text-lg font-bold text-slate-800">{previewSummary.families}</div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="text-[10px] font-semibold text-emerald-700 uppercase">Valid</div>
                  <div className="text-lg font-bold text-emerald-800">{previewSummary.ok}</div>
                </div>
                <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                  <div className="text-[10px] font-semibold text-rose-700 uppercase">Issues</div>
                  <div className="text-lg font-bold text-rose-800">{previewSummary.failed}</div>
                </div>
              </div>

              {/* Rows preview table */}
              {previewRows.length > 0 && (
                <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold sticky top-0">
                      <tr>
                        <th className="py-2 px-3">Row</th>
                        <th className="py-2 px-3">Product Code</th>
                        <th className="py-2 px-3">Product Title</th>
                        <th className="py-2 px-3">Category Path</th>
                        <th className="py-2 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {previewRows.map((r, i) => (
                        <tr key={i} className="hover:bg-slate-50/70">
                          <td className="py-1.5 px-3 font-mono text-slate-500">{r.row}</td>
                          <td className="py-1.5 px-3 font-bold text-slate-900">{r.productCode}</td>
                          <td className="py-1.5 px-3 text-slate-700 truncate max-w-[180px]">
                            {r.title || r.name}
                          </td>
                          <td className="py-1.5 px-3 text-slate-500 font-mono truncate max-w-[180px]">
                            {r.categoryPath || '—'}
                          </td>
                          <td className="py-1.5 px-3">
                            {r.ok ? (
                              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                Ready
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                                {r.issues?.[0] || 'Error'}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Issues list if any */}
              {previewIssues.length > 0 && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <FiAlertCircle size={14} />
                    <span>Noted issues ({previewIssues.length}):</span>
                  </div>
                  {previewIssues.slice(0, 3).map((iss, idx) => (
                    <div key={idx} className="text-[11px] pl-5">
                      • Row {iss.row} ({iss.productCode}): {iss.reason}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Import Result Feedback */}
          {importResult && (
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                <FiCheckCircle size={16} />
                <span>Bulk Import Complete</span>
              </div>
              <div className="text-xs text-emerald-700">
                Created: <strong>{importResult.summary?.created || 0}</strong> products •{' '}
                Families: <strong>{importResult.summary?.families || 0}</strong> •{' '}
                Failed: <strong>{importResult.summary?.failed || 0}</strong>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            Clear Files
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleExecuteImport}
              disabled={!sheetFile || isImporting}
              className="px-4 py-2 bg-navy hover:bg-navy-light text-white rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            >
              <FiUploadCloud size={14} />
              <span>{isImporting ? 'Importing Products...' : 'Execute Bulk Listing'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
