import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FileUploader } from '../components/import-export/FileUploader';
import { ImportPreview } from '../components/import-export/ImportPreview';
import { ExportOptions } from '../components/import-export/ExportOptions';
import { HistoryTable } from '../components/import-export/HistoryTable';
import { TabNavigation } from '../components/shared/TabNavigation';
import { UploadIcon, DownloadIcon, FileTextIcon, ClockIcon } from 'lucide-react';
import { toast } from 'sonner';
export function ImportExport() {
  const [activeTab, setActiveTab] = useState('import');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  // Mock data
  const previewData = [{
    id: '1',
    name: 'Product 1',
    sku: 'SKU001',
    price: '99.99'
  }, {
    id: '2',
    name: 'Product 2',
    sku: 'SKU002',
    price: '149.99'
  }, {
    id: '3',
    name: 'Product 3',
    sku: '',
    price: 'invalid'
  }];
  const previewErrors = {
    '3': ['sku', 'price']
  };
  const historyItems = [{
    id: '1',
    type: 'import',
    dataType: 'products',
    fileName: 'products_batch_1.csv',
    status: 'completed',
    timestamp: '2024-02-20 14:30',
    size: '2.4 MB'
  }, {
    id: '2',
    type: 'export',
    dataType: 'orders',
    fileName: 'orders_feb_2024.xlsx',
    status: 'processing',
    timestamp: '2024-02-20 14:25',
    size: '1.8 MB'
  }, {
    id: '3',
    type: 'import',
    dataType: 'users',
    fileName: 'users_import.csv',
    status: 'failed',
    timestamp: '2024-02-20 14:20',
    size: '512 KB'
  }];
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setIsUploading(true);
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        toast.success('File uploaded successfully');
      }
    }, 500);
  };
  const handleExport = (options: any) => {
    setIsExporting(true);
    // Simulate export
    setTimeout(() => {
      setIsExporting(false);
      toast.success('Data exported successfully');
    }, 2000);
  };
  const tabs = [{
    id: 'import',
    label: 'Import',
    icon: <UploadIcon size={18} />
  }, {
    id: 'export',
    label: 'Export',
    icon: <DownloadIcon size={18} />
  }, {
    id: 'templates',
    label: 'Templates',
    icon: <FileTextIcon size={18} />
  }, {
    id: 'history',
    label: 'History',
    icon: <ClockIcon size={18} />
  }];
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Import & Export Data</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Import and export your warehouse data
        </p>
      </div>
      <TabNavigation tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <div className="space-y-6">
        {activeTab === 'import' && <>
            <Card>
              <FileUploader onFileSelect={handleFileSelect} acceptedFileTypes={['.csv', '.xlsx']} file={selectedFile} onClear={() => setSelectedFile(null)} isUploading={isUploading} progress={uploadProgress} />
            </Card>
            {selectedFile && !isUploading && <ImportPreview data={previewData} errors={previewErrors} columns={[{
          key: 'name',
          header: 'Name'
        }, {
          key: 'sku',
          header: 'SKU'
        }, {
          key: 'price',
          header: 'Price'
        }]} />}
          </>}
        {activeTab === 'export' && <ExportOptions onExport={handleExport} isExporting={isExporting} />}
        {activeTab === 'templates' && <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Download Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {['Products', 'Orders', 'Users', 'Inventory'].map(template => <Card key={template} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileTextIcon size={24} className="text-teal-500" />
                          <div>
                            <h4 className="font-medium">{template} Template</h4>
                            <p className="text-sm text-gray-500">CSV, XLSX</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" icon={<DownloadIcon size={14} />}>
                          Download
                        </Button>
                      </div>
                    </Card>)}
              </div>
            </div>
          </Card>}
        {activeTab === 'history' && <HistoryTable items={historyItems} onDownload={id => {
        toast.success('Download started');
      }} onRetry={id => {
        toast.success('Retrying import');
      }} />}
      </div>
    </div>;
}