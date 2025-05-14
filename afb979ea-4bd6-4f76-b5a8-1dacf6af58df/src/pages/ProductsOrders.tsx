import React, { useState } from 'react';
import { TabNavigation } from '../components/shared/TabNavigation';
import { ProductsView } from '../components/products/ProductsView';
import { OrdersView } from '../components/orders/OrdersView';
import { PackageIcon, ShoppingCartIcon } from 'lucide-react';
export function ProductsOrders() {
  const [activeTab, setActiveTab] = useState('products');
  const tabs = [{
    id: 'products',
    label: 'Products',
    icon: <PackageIcon size={18} />,
    count: 128
  }, {
    id: 'orders',
    label: 'Orders',
    icon: <ShoppingCartIcon size={18} />,
    count: 12
  }];
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Products & Orders</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your inventory and customer orders
        </p>
      </div>
      <TabNavigation tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <div className="mt-6">
        {activeTab === 'products' ? <ProductsView /> : <OrdersView />}
      </div>
    </div>;
}