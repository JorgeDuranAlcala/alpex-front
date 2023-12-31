// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    /*********************************************** News Items ReDesign *****************************************************/
    {
      title: 'Dashboard',
      icon: 'ic:baseline-dashboard',
      path: '/dashboards/crm',
      subject: 'dashboard',
      action: 'read',
    },
    {
      title: 'Accounts',
      icon: 'ic:baseline-business-center',
      externalLink: true,
      path: '/accounts',
      subject: 'account',
      action: 'read',
      children: [
        {
          title: 'All',
          icon: 'ion:file-tray-stacked',
          path: '/accounts',
          subject: 'account',
          action: 'viewAllAccounts',
        },
        {
          title: 'Pending',
          icon: 'mdi:clock',
          path: '/accounts/pending',
          subject: 'account',
          action: 'viewPendingAccounts',
        },
        {
          title: 'Not Materialized',
          icon: 'mdi:progress-helper',
          path: '/accounts/not-materialized',
          subject: 'account',
          action: 'viewNotMaterializedAccounts',

        },
        {
          title: 'Not Taken Up',
          icon: 'custom:not-taken-up',
          path: '/accounts/not-taken-up',
          subject: 'account',
          action: 'viewNotTakenUpAccounts',
        },
        {
          title: 'Declined',
          icon: 'mdi:cancel',
          path: '/accounts/declined',
          subject: 'account',
          action: 'viewDeclinedAccounts',
        },
        {
          title: 'Bound',
          icon: 'icon-park-outline:link-three',
          path: '/accounts/bound',
          subject: 'account',
          action: 'viewBoundAccounts',
        }
      ]
    },
    {
      title: 'Payments',
      icon: 'ic:baseline-payments',
      subject: 'payments',
      action: 'read',
      children: [
        {
          title: 'Installments',
          icon: 'ic:assignment-turned-in',
          path: '/installments',
          subject: 'payments',
          action: 'viewInstallmentsPayment',
        },
        {
          title: 'Brocker Tracker',
          icon: 'mdi:text-search',
          path: '/broker-tracker',
          subject: 'payments',
          action: 'viewBrokerTrackerPayment',
        },
        {
          title: 'Reinsurer Payment',
          icon: 'material-symbols:mobiledata-off',
          path: '/reinsurer-payment',
          subject: 'payments',
          action: 'viewReinsurerPayment',
        },
        {
          title: 'List',
          path: '/menuForm'
        },
        {
          title: 'Preview'
        },
        {
          title: 'Edit'
        },
        {
          title: 'Add'
        }
      ]
    },
    {
      title: 'ARAP',
      icon: 'ic:round-calculate',
      subject: 'arap',
      action: 'read',
      children: [
        {
          title: 'Overview',
          icon: 'la:signal',

          // icon: 'healthicons:high-bars-negative',
          path: '/arap/overview',
          subject: 'arap',
          action: 'viewOverviewArap',
        },
        {
          title: 'Payables',
          icon: 'ph:minus-fill',
          path: '/arap/payables',
          subject: 'arap',
          action: 'viewPayablesArap',
        },
        {
          title: 'Receivables',
          icon: 'ph:plus-fill',
          path: '/arap/receivables',
          subject: 'arap',
          action: 'viewReceivablesArap',
        },
      ],
    },
    {
      title: 'Renewals',
      icon: 'ic:baseline-autorenew',
      subject: 'renewals',
      action: 'read',
      children: [
        {
          title: 'List'

          // path: '/apps/invoice/list'
        },
        {
          title: 'Preview'
        },
        {
          title: 'Edit'
        },
        {
          title: 'Add'
        }
      ]
    },
    {
      title: 'Claims',
      icon: 'ic:baseline-content-paste',
      subject: 'claims',
      action: 'read',
      children: [
        {
          title: 'List'

          // path: '/apps/invoice/list'
        },
        {
          title: 'Preview'
        },
        {
          title: 'Edit'
        },
        {
          title: 'Add'
        }
      ]
    },
    {
      title: 'Users',
      icon: 'mdi:user-group',
      path: '/users',
      subject: 'users',
      action: 'read',
    },
    {
      title: 'Catalogues',
      icon: 'ic:sharp-menu-book',
      subject: 'catalogues',
      action: 'read',
      children: [
        {
          title: 'Dynamic',
          path: '/catalogues/dynamic',
          subject: 'catalogues',
          action: 'viewDynamicCatalogues',

          // path: '/apps/invoice/list'
        },
        {
          title: 'Claims/claims'
        }
      ]
    },
    {
      title: 'Configuration',
      icon: 'mdi:settings-outline',
      subject: 'configuration',
      action: 'read',
      children: [
        {
          title: 'List'

          // path: '/apps/invoice/list'
        },
        {
          title: 'Preview'
        },
        {
          title: 'Edit'
        },
        {
          title: 'Add'
        }
      ]
    },
    {
      title: 'Dynamic Data',
      icon: 'custom:dynamic-data',
      subject: 'dynamicData',
      action: 'read',
      children: [
        {
          title: 'Dashboard',
          icon: 'ic:baseline-dashboard',
          path: '/dynamic-data/dashboard',
          subject: 'dynamicData',
          action: 'viewDashboardData',
        },
        {
          title: 'Property listing',
          icon: 'ic:baseline-list',
          path: '/dynamic-data/property-listing',
          subject: 'dynamicData',
          action: 'viewPropertyListingData',
        },
        {
          title: 'Maps',
          icon: 'ic:round-map',
          subject: 'dynamicData',
          action: 'viewMapsData',
          children: [
            {
              title: 'Properties',
              icon: 'ic:round-location-city',
              path: '/dynamic-data/maps/map-properties',
              subject: 'dynamicData',
              action: 'viewMapPropertiesData',
            },
            {
              title: 'VALFIS',
              icon: 'ic:baseline-attach-money',
              path: '/dynamic-data/maps/map-valfis',
              subject: 'dynamicData',
              action: 'viewMapValfisData',
            },
            {
              title: 'ZONACRESTA',
              icon: 'ic:round-location-on',
              path: '/dynamic-data/maps/map-zonacresta',
              subject: 'dynamicData',
              action: 'viewZonaCrestaData',
            },
            {
              title: 'Earthquakes',
              icon: 'ic:baseline-warning-amber',
              path: '/dynamic-data/maps/map-earthquakes',
              subject: 'dynamicData',
              action: 'viewEarthquakesData',
            },
            {
              title: 'Hurricanes',
              icon: 'ic:baseline-waves',
              subject: 'dynamicData',
              action: 'viewHurricanesData',
            }
          ]
        }
      ]
    }

    /***********************************************************************************************************************/
    /*{
      title: 'Dashboards',
      icon: 'mdi:home-outline',
      badgeContent: 'new',
      badgeColor: 'error',
      children: [
        {
          title: 'CRM',
          path: '/dashboards/crm'
        },
        {
          title: 'Analytics',
          path: '/dashboards/analytics'
        },
        {
          title: 'eCommerce',
          path: '/dashboards/ecommerce'
        }
      ]
    },
    {
      sectionTitle: 'Apps & Pages'
    },
    {
      title: 'Email',
      icon: 'mdi:email-outline',
      path: '/apps/email'
    },
    {
      title: 'Chat',
      icon: 'mdi:message-outline',
      path: '/apps/chat'
    },
    {
      title: 'Calendar',
      icon: 'mdi:calendar-blank-outline',
      path: '/apps/calendar'
    },
    {
      title: 'Invoice',
      icon: 'mdi:file-document-outline',
      children: [
        {
          title: 'List',
          path: '/apps/invoice/list'
        },
        {
          title: 'Preview',
          path: '/apps/invoice/preview'
        },
        {
          title: 'Edit',
          path: '/apps/invoice/edit'
        },
        {
          title: 'Add',
          path: '/apps/invoice/add'
        }
      ]
    },
    {
      title: 'User',
      icon: 'mdi:account-outline',
      children: [
        {
          title: 'List',
          path: '/apps/user/list'
        },
        {
          title: 'View',
          children: [
            {
              title: 'Overview',
              path: '/apps/user/view/overview'
            },
            {
              title: 'Security',
              path: '/apps/user/view/security'
            },
            {
              title: 'Billing & Plans',
              path: '/apps/user/view/billing-plan'
            },
            {
              title: 'Notifications',
              path: '/apps/user/view/notification'
            },
            {
              title: 'Connection',
              path: '/apps/user/view/connection'
            }
          ]
        }
      ]
    },
    {
      title: 'Roles & Permissions',
      icon: 'mdi:shield-outline',
      children: [
        {
          title: 'Roles',
          path: '/apps/roles'
        },
        {
          title: 'Permissions',
          path: '/apps/permissions'
        }
      ]
    },
    {
      title: 'Pages',
      icon: 'mdi:file-document-outline',
      children: [
        {
          title: 'User Profile',
          children: [
            {
              title: 'Profile',
              path: '/pages/user-profile/profile'
            },
            {
              title: 'Teams',
              path: '/pages/user-profile/teams'
            },
            {
              title: 'Projects',
              path: '/pages/user-profile/projects'
            },
            {
              title: 'Connections',
              path: '/pages/user-profile/connections'
            }
          ]
        },
        {
          title: 'Account Settings',
          children: [
            {
              title: 'Account',
              path: '/pages/account-settings/account'
            },
            {
              title: 'Security',
              path: '/pages/account-settings/security'
            },
            {
              title: 'Billing',
              path: '/pages/account-settings/billing'
            },
            {
              title: 'Notifications',
              path: '/pages/account-settings/notifications'
            },

            {
              title: 'Connections',
              path: '/pages/account-settings/connections'
            }
          ]
        },
        {
          title: 'FAQ',
          path: '/pages/faq'
        },
        {
          title: 'Help Center',
          path: '/pages/help-center'
        },
        {
          title: 'Pricing',
          path: '/pages/pricing'
        },
        {
          title: 'Miscellaneous',
          children: [
            {
              openInNewTab: true,
              title: 'Coming Soon',
              path: '/pages/misc/coming-soon'
            },
            {
              openInNewTab: true,
              title: 'Under Maintenance',
              path: '/pages/misc/under-maintenance'
            },
            {
              openInNewTab: true,
              title: 'Page Not Found - 404',
              path: '/pages/misc/404-not-found'
            },
            {
              openInNewTab: true,
              title: 'Not Authorized - 401',
              path: '/pages/misc/401-not-authorized'
            },
            {
              openInNewTab: true,
              title: 'Server Error - 500',
              path: '/pages/misc/500-server-error'
            }
          ]
        }
      ]
    },
    {
      title: 'Auth Pages',
      icon: 'mdi:lock-outline',
      children: [
        {
          title: 'Login',
          children: [
            {
              openInNewTab: true,
              title: 'Login v1',
              path: '/pages/auth/login-v1'
            },
            {
              openInNewTab: true,
              title: 'Login v2',
              path: '/pages/auth/login-v2'
            },
            {
              openInNewTab: true,
              title: 'Login With AppBar',
              path: '/pages/auth/login-with-appbar'
            }
          ]
        },
        {
          title: 'Register',
          children: [
            {
              openInNewTab: true,
              title: 'Register v1',
              path: '/pages/auth/register-v1'
            },
            {
              openInNewTab: true,
              title: 'Register v2',
              path: '/pages/auth/register-v2'
            },
            {
              openInNewTab: true,
              title: 'Register Multi-Steps',
              path: '/pages/auth/register-multi-steps'
            }
          ]
        },
        {
          title: 'Verify Email',
          children: [
            {
              openInNewTab: true,
              title: 'Verify Email v1',
              path: '/pages/auth/verify-email-v1'
            },
            {
              openInNewTab: true,
              title: 'Verify Email v2',
              path: '/pages/auth/verify-email-v2'
            }
          ]
        },
        {
          title: 'Forgot Password',
          children: [
            {
              openInNewTab: true,
              title: 'Forgot Password v1',
              path: '/pages/auth/forgot-password-v1'
            },
            {
              openInNewTab: true,
              title: 'Forgot Password v2',
              path: '/pages/auth/forgot-password-v2'
            }
          ]
        },
        {
          title: 'Reset Password',
          children: [
            {
              openInNewTab: true,
              title: 'Reset Password v1',
              path: '/pages/auth/reset-password-v1'
            },
            {
              openInNewTab: true,
              title: 'Reset Password v2',
              path: '/pages/auth/reset-password-v2'
            }
          ]
        },
        {
          title: 'Two Steps',
          children: [
            {
              openInNewTab: true,
              title: 'Two Steps v1',
              path: '/pages/auth/two-steps-v1'
            },
            {
              openInNewTab: true,
              title: 'Two Steps v2',
              path: '/pages/auth/two-steps-v2'
            }
          ]
        }
      ]
    },
    {
      title: 'Wizard Examples',
      icon: 'mdi:transit-connection-horizontal',
      children: [
        {
          title: 'Checkout',
          path: '/pages/wizard-examples/checkout'
        },
        {
          title: 'Property Listing',
          path: '/pages/wizard-examples/property-listing'
        },
        {
          title: 'Create Deal',
          path: '/pages/wizard-examples/create-deal'
        }
      ]
    },
    {
      icon: 'mdi:vector-arrange-below',
      title: 'Dialog Examples',
      path: '/pages/dialog-examples'
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: 'mdi:format-letter-case',
      path: '/ui/typography'
    },
    {
      title: 'Icons',
      path: '/ui/icons',
      icon: 'mdi:google-circles-extended'
    },
    {

      title: 'Cards',
      icon: 'mdi:credit-card-outline',
      children: [
        {
          title: 'Basic',
          path: '/ui/cards/basic'
        },
        {
          title: 'Advanced',
          path: '/ui/cards/advanced'
        },
        {
          title: 'Statistics',
          path: '/ui/cards/statistics'
        },
        {
          title: 'Widgets',
          path: '/ui/cards/widgets'
        },
        {
          title: 'Gamification',
          path: '/ui/cards/gamification'
        },
        {
          title: 'Actions',
          path: '/ui/cards/actions'
        }
      ]
    },
    {
      badgeContent: '18',
      title: 'Components',
      icon: 'mdi:archive-outline',
      badgeColor: 'primary',
      children: [
        {
          title: 'Accordion',
          path: '/components/accordion'
        },
        {
          title: 'Alerts',
          path: '/components/alerts'
        },
        {
          title: 'Avatars',
          path: '/components/avatars'
        },
        {
          title: 'Badges',
          path: '/components/badges'
        },
        {
          title: 'Buttons',
          path: '/components/buttons'
        },
        {
          title: 'Button Group',
          path: '/components/button-group'
        },
        {
          title: 'Chips',
          path: '/components/chips'
        },
        {
          title: 'Dialogs',
          path: '/components/dialogs'
        },
        {
          title: 'List',
          path: '/components/list'
        },
        {
          title: 'Menu',
          path: '/components/menu'
        },
        {
          title: 'Pagination',
          path: '/components/pagination'
        },
        {
          title: 'Ratings',
          path: '/components/ratings'
        },
        {
          title: 'Snackbar',
          path: '/components/snackbar'
        },
        {
          title: 'Swiper',
          path: '/components/swiper'
        },
        {
          title: 'Tabs',
          path: '/components/tabs'
        },
        {
          title: 'Timeline',
          path: '/components/timeline'
        },
        {
          title: 'Toasts',
          path: '/components/toast'
        },
        {
          title: 'Tree View',
          path: '/components/tree-view'
        },
        {
          title: 'More',
          path: '/components/more'
        },
      ]
    },
    {
      sectionTitle: 'Forms & Tables'
    },
    {
      title: 'Form Elements',
      icon: 'mdi:form-select',
      children: [
        {
          title: 'Text Field',
          path: '/forms/form-elements/text-field'
        },
        {
          title: 'Select',
          path: '/forms/form-elements/select'
        },
        {
          title: 'Checkbox',
          path: '/forms/form-elements/checkbox'
        },
        {
          title: 'Radio',
          path: '/forms/form-elements/radio'
        },
        {
          title: 'Custom Inputs',
          path: '/forms/form-elements/custom-inputs'
        },
        {
          title: 'Textarea',
          path: '/forms/form-elements/textarea'
        },
        {
          title: 'Autocomplete',
          path: '/forms/form-elements/autocomplete'
        },
        {
          title: 'Date Pickers',
          path: '/forms/form-elements/pickers'
        },
        {
          title: 'Switch',
          path: '/forms/form-elements/switch'
        },
        {
          title: 'File Uploader',
          path: '/forms/form-elements/file-uploader'
        },
        {
          title: 'Editor',
          path: '/forms/form-elements/editor'
        },
        {
          title: 'Slider',
          path: '/forms/form-elements/slider'
        },
        {
          title: 'Input Mask',
          path: '/forms/form-elements/input-mask'
        },
      ]
    },
    {
      icon: 'mdi:cube-outline',
      title: 'Form Layouts',
      path: '/forms/form-layouts'
    },
    {
      title: 'Form Validation',
      path: '/forms/form-validation',
      icon: 'mdi:checkbox-marked-circle-outline'
    },
    {
      title: 'Form Wizard',
      path: '/forms/form-wizard',
      icon: 'mdi:transit-connection-horizontal'
    },
    {
      title: 'Table',
      icon: 'mdi:grid-large',
      path: '/tables/mui'
    },
    {
      title: 'Mui DataGrid',
      icon: 'mdi:grid',
      path: '/tables/data-grid'
    },
    {
      sectionTitle: 'Charts & Misc'
    },
    {
      title: 'Charts',
      icon: 'mdi:chart-donut',
      children: [
        {
          title: 'Apex',
          path: '/charts/apex-charts'
        },
        {
          title: 'Recharts',
          path: '/charts/recharts'
        },
        {
          title: 'ChartJS',
          path: '/charts/chartjs'
        }
      ]
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      icon: 'mdi:shield-outline',
      title: 'Access Control'
    },
    {
      title: 'Others',
      icon: 'mdi:dots-horizontal',
      children: [
        {
          title: 'Menu Levels',
          children: [
            {
              title: 'Menu Level 2.1'
            },
            {
              title: 'Menu Level 2.2',
              children: [
                {
                  title: 'Menu Level 3.1'
                },
                {
                  title: 'Menu Level 3.2'
                }
              ]
            }
          ]
        },
        {
          title: 'Disabled Menu',
          disabled: true
        },
        {
          title: 'Raise Support',
          externalLink: true,
          openInNewTab: true,
          path: 'https://pixinvent.ticksy.com/'
        },
        {
          title: 'Documentation',
          externalLink: true,
          openInNewTab: true,
          path: 'https://pixinvent.com/demo/materialize-mui-react-nextjs-admin-template/documentation'
        }
      ]
    }*/
  ]
}

export default navigation
