import React from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { PencilIcon, MoreVerticalIcon } from 'lucide-react';
interface ProductCardProps {
  product: {
    id: string;
    image: string;
    name: string;
    sku: string;
    category: string;
    price: string;
    stock: number;
    status: 'in_stock' | 'low_stock' | 'out_of_stock';
  };
  onEdit: () => void;
}
export function ProductCard({
  product,
  onEdit
}: ProductCardProps) {
  const getStockBadge = (status: string) => {
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
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="relative aspect-square">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2">
          {getStockBadge(product.status)}
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              SKU: {product.sku}
            </p>
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {product.price}
          </p>
        </div>
        <div className="flex items-center justify-between pt-2">
          <Badge variant="secondary">{product.category}</Badge>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="!p-1" onClick={onEdit}>
              <PencilIcon size={14} />
            </Button>
            <Button variant="outline" size="sm" className="!p-1">
              <MoreVerticalIcon size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>;
}