import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { IntegrationCard } from '../components/integrations/IntegrationCard';
import { APIKeyTable } from '../components/integrations/APIKeyTable';
import { GenerateKeyModal } from '../components/integrations/GenerateKeyModal';
import { SecurityTips } from '../components/integrations/SecurityTips';
import { Modal } from '../components/ui/Modal';
import { PlusIcon, KeyIcon } from 'lucide-react';
import { toast } from 'sonner';
export function Integrations() {
  const [isGenerateKeyModalOpen, setIsGenerateKeyModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedKeyId, setSelectedKeyId] = useState<string | null>(null);
  // Mock data
  const integrations = [{
    id: 'shopify',
    name: 'Shopify',
    description: 'Connect your Shopify store to sync products and orders.',
    icon: 'https://cdn.worldvectorlogo.com/logos/shopify.svg',
    status: 'connected' as const,
    lastSync: '2 hours ago',
    docsUrl: '#'
  }, {
    id: 'stripe',
    name: 'Stripe',
    description: 'Process payments and manage subscriptions.',
    icon: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg',
    status: 'connected' as const,
    lastSync: '1 hour ago',
    docsUrl: '#'
  }, {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Track website traffic and user behavior.',
    icon: 'https://cdn.worldvectorlogo.com/logos/google-analytics-4.svg',
    status: 'disconnected' as const,
    docsUrl: '#'
  }];
  const apiKeys = [{
    id: '1',
    name: 'Production API Key',
    key: 'pk_live_1234567890abcdef',
    createdAt: '2024-02-20',
    lastUsed: '2 minutes ago',
    permissions: ['read:products', 'write:orders'],
    status: 'active' as const
  }, {
    id: '2',
    name: 'Development API Key',
    key: 'pk_test_1234567890abcdef',
    createdAt: '2024-02-19',
    lastUsed: '1 day ago',
    permissions: ['read:products', 'read:orders'],
    status: 'active' as const
  }];
  const availablePermissions = [{
    id: 'read:products',
    name: 'Read Products',
    description: 'View product information',
    group: 'Products'
  }, {
    id: 'write:products',
    name: 'Write Products',
    description: 'Create and update products',
    group: 'Products'
  }, {
    id: 'read:orders',
    name: 'Read Orders',
    description: 'View order information',
    group: 'Orders'
  }, {
    id: 'write:orders',
    name: 'Write Orders',
    description: 'Create and update orders',
    group: 'Orders'
  }];
  const handleIntegrationToggle = (id: string) => {
    toast.success(`Integration ${id} updated`);
  };
  const handleIntegrationConfigure = (id: string) => {
    toast.info(`Configuring ${id} integration`);
  };
  const handleGenerateKey = (data: {
    name: string;
    permissions: string[];
  }) => {
    toast.success('New API key generated');
    setIsGenerateKeyModalOpen(false);
  };
  const handleRevokeKey = (id: string) => {
    setSelectedKeyId(id);
    setIsConfirmModalOpen(true);
  };
  const confirmRevoke = () => {
    if (selectedKeyId) {
      toast.success('API key revoked');
      setIsConfirmModalOpen(false);
      setSelectedKeyId(null);
    }
  };
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Integrations & API Keys</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your connected services and API access
        </p>
      </div>
      <div className="grid gap-6">
        <Card title="Available Integrations">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map(integration => <IntegrationCard key={integration.id} integration={integration} onToggle={handleIntegrationToggle} onConfigure={handleIntegrationConfigure} />)}
          </div>
        </Card>
        <Card title="API Keys" subtitle="Manage your API keys and permissions" icon={<KeyIcon size={18} />}>
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button icon={<PlusIcon size={16} />} onClick={() => setIsGenerateKeyModalOpen(true)}>
                Generate New Key
              </Button>
            </div>
            <APIKeyTable keys={apiKeys} onRevoke={handleRevokeKey} onRegenerate={id => toast.info(`Regenerating key ${id}`)} />
          </div>
        </Card>
        <SecurityTips />
      </div>
      <GenerateKeyModal isOpen={isGenerateKeyModalOpen} onClose={() => setIsGenerateKeyModalOpen(false)} onGenerate={handleGenerateKey} availablePermissions={availablePermissions} />
      <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} title="Revoke API Key" footer={<div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsConfirmModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmRevoke}>
              Revoke Key
            </Button>
          </div>}>
        <p className="text-gray-500 dark:text-gray-400">
          Are you sure you want to revoke this API key? This action cannot be
          undone, and any applications using this key will stop working
          immediately.
        </p>
      </Modal>
    </div>;
}