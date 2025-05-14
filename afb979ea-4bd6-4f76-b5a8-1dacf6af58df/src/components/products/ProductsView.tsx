import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { DataTable } from '../shared/DataTable';
import { ProductCard } from './ProductCard';
import { PlusIcon, SearchIcon, FilterIcon, TrashIcon, PencilIcon, MoreVerticalIcon, PackageIcon } from 'lucide-react';
interface Product {
  id: string;
  image: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}
const mockProducts: Product[] = [{
  id: '1',
  image: 'https://placehold.co/200x200/2C3E50/FFFFFF?text=Product',
  name: 'Wireless Headphones',
  sku: 'WH-001',
  category: 'Electronics',
  price: '$99.99',
  stock: 45,
  status: 'in_stock'
}, {
  id: '2',
  image: 'https://placehold.co/200x200/2C3E50/FFFFFF?text=Product',
  name: 'Smart Watch',
  sku: 'SW-002',
  category: 'Electronics',
  price: '$199.99',
  stock: 5,
  status: 'low_stock'
}, {
  id: '3',
  image: 'https://placehold.co/200x200/2C3E50/FFFFFF?text=Product',
  name: 'Bluetooth Speaker',
  sku: 'BS-003',
  category: 'Electronics',
  price: '$79.99',
  stock: 0,
  status: 'out_of_stock'
}];
export function ProductsView() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? mockProducts.map(p => p.id) : []);
  };
  const handleSelectProduct = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_stock':
        return <Badge variant="success">In Stock</Badge>;
      case 'low_stock':
        return <Badge variant="warning">Low Stock</Badge>;
      case 'out_of_stock':
        return <Badge variant="danger">Out of Stock</Badge>;
      default:
        return null;
    }
  };
  const columns = [{
    key: 'image',
    header: '',
    width: '80px',
    render: (product: Product) => <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
  }, {
    key: 'name',
    header: 'Product',
    render: (product: Product) => <div>
          <div className="font-medium text-gray-900 dark:text-gray-100">
            {product.name}
          </div>
          <div className="text-sm text-gray-500">{product.sku}</div>
        </div>
  }, {
    key: 'category',
    header: 'Category',
    render: (product: Product) => <Badge variant="secondary">{product.category}</Badge>
  }, {
    key: 'status',
    header: 'Status',
    render: (product: Product) => getStatusBadge(product.status)
  }, {
    key: 'price',
    header: 'Price',
    render: (product: Product) => <span className="font-medium">{product.price}</span>
  }, {
    key: 'actions',
    header: 'Actions',
    width: '100px',
    render: (product: Product) => <div className="flex justify-end space-x-2">
          <Button variant="outline" size="sm" className="!p-1">
            <PencilIcon size={14} />
          </Button>
          <Button variant="outline" size="sm" className="!p-1">
            <MoreVerticalIcon size={14} />
          </Button>
        </div>
  }];
  return <Card>
      <div className="space-y-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="flex-1 min-w-0">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon size={16} className="text-gray-400" />
              </div>
              <input type="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500" placeholder="Search products..." />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" icon={<FilterIcon size={16} />}>
              Filters
            </Button>
            <Button icon={<PlusIcon size={16} />}>Add Product</Button>
          </div>
        </div>
        {selectedIds.length > 0 && <div className="flex items-center justify-between py-2 px-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {selectedIds.length} selected
            </span>
            <Button size="sm" variant="danger" icon={<TrashIcon size={16} />}>
              Delete Selected
            </Button>
          </div>}
        {/* Table View */}
        <div className="hidden md:block">
          <DataTable data={mockProducts} columns={columns} selectable selectedIds={selectedIds} onSelectAll={handleSelectAll} onSelectItem={handleSelectProduct} />
        </div>
        {/* Grid View (Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {mockProducts.map(product => <ProductCard key={product.id} product={product} onEdit={() => {}} />)}
        </div>
      </div>
    </Card>;
}