import React from 'react'
import DeleteUser from '@/components/delete-user'
import AppLayout from '@/layouts/app-layout'
import SettingsLayout from '@/layouts/settings/layout'
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Delete Account settings',
        href: '/settings/deleteAccount',
    },
];

const deleteAccount = () => {
  return (
      <AppLayout breadcrumbs={breadcrumbs}>
          <Head title="Delete Account settings" />

          <SettingsLayout>
              <DeleteUser />
          </SettingsLayout>
      </AppLayout>
  );
}

export default deleteAccount
