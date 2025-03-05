export default {
  translation: {
    common: {
      search: 'Buscar',
      searchPlaceholder: 'Buscar por produtos, clientes, vendas...',
      notifications: 'Notificações',
      viewAll: 'Ver todos',
      storeName: 'Minha Loja',
      actions: {
        new: 'Novo',
        edit: 'Editar',
        delete: 'Excluir',
        save: 'Salvar',
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        back: 'Voltar',
        export: 'Exportar',
        import: 'Importar',
        filter: 'Filtrar',
        moreFilters: 'Mais Filtros',
        clearAll: 'Limpar Tudo',
        viewDetails: 'Ver Detalhes',
        markAsRead: 'Marcar como Lido',
        markAllAsRead: 'Marcar Todas como Lidas'
      },
      status: {
        active: 'Ativo',
        inactive: 'Inativo',
        pending: 'Pendente',
        completed: 'Concluído',
        cancelled: 'Cancelado',
        processing: 'Em Processamento'
      },
      priority: {
        high: 'Alta',
        medium: 'Média',
        low: 'Baixa'
      },
      time: {
        now: 'Agora',
        minutesAgo: 'Há {{count}} minuto',
        minutesAgo_plural: 'Há {{count}} minutos',
        hoursAgo: 'Há {{count}} hora',
        hoursAgo_plural: 'Há {{count}} horas',
        today: 'Hoje',
        yesterday: 'Ontem',
        daysAgo: 'Há {{count}} dia',
        daysAgo_plural: 'Há {{count}} dias'
      }
    },
    statsCards: {
      sales: {
        title: 'Vendas',
        sales: '{{count}} vendas',
        netTotal: 'Líquido',
        grossTotal: 'Total bruto'
      },
      spending: {
        title: 'Despesas',
        accountsPayable: '{{count}} contas a pagar'
      }
    },
    navigation: {
      dashboard: 'Dashboard',
      quicksale: 'Venda Rápida',
      scanner: 'Scanner',
      menu: 'Menu',
      sales: 'Vendas',
      inventory: 'Estoque',
      finance: 'Finanças',
      customers: 'Clientes',
      settings: 'Configurações',
      activity: 'Atividade'
    },
    dashboard: {
      title: 'Dashboard',
      stats: {
        todaySales: 'Vendas de Hoje',
        goal: 'Meta: {{amount}} ({{percentage}}%)',
        vsYesterday: '{{percentage}}% vs ontem',
        newCustomers: 'Novos Clientes ({{month}})',
        newCount: '{{count}} novos',
        recurringCount: '{{count}} recorrentes',
        last24h: '{{new}} novos, {{recurring}} recorrentes nas últimas 24h',
        stockItems: 'Items em Estoque',
        needsReplenishment: '{{count}} items precisam de reposição',
        alerts: 'Alertas',
        criticalAlerts: '{{count}} alertas críticos',
        totalSales: 'Total de Vendas',
        averageTicket: 'Ticket Médio',
        activeCustomers: 'Clientes Ativos',
        salesTrend: 'Tendência de Vendas',
        customerActivity: 'Atividade de Clientes',
        lowStock: 'Produtos em Baixa'
      },
      activity: {
        newSale: 'Nova Venda',
        orderAmount: 'Pedido #{{order}} - {{amount}}',
        lowStock: 'Alerta de Estoque',
        productStock: '{{product}} tem {{units}} unidades restantes',
        newCustomer: 'Novo Cliente',
        customerRegistered: '{{name}} se cadastrou'
      },
      recentActivity: 'Atividade Recente',
      months: {
        january: 'Janeiro',
        february: 'Fevereiro',
        march: 'Março',
        april: 'Abril',
        may: 'Maio',
        june: 'Junho',
        july: 'Julho',
        august: 'Agosto',
        september: 'Setembro',
        october: 'Outubro',
        november: 'Novembro',
        december: 'Dezembro'
      }
    },
    sales: {
      title: 'Vendas',
      newSale: 'Nova Venda',
      quickSale: 'Venda Rápida',
      recentSales: 'Vendas Recentes',
      paymentMethods: {
        cash: 'Dinheiro',
        credit: 'Cartão de Crédito',
        debit: 'Cartão de Débito',
        pix: 'PIX',
        transfer: 'Transferência'
      }
    },
    inventory: {
      title: 'Estoque',
      products: 'Produtos',
      categories: 'Categorias',
      suppliers: 'Fornecedores',
      lowStock: 'Estoque Baixo',
      stockIn: 'Entrada',
      stockOut: 'Saída'
    },
    customers: {
      title: 'Clientes',
      newCustomer: 'Novo Cliente',
      profile: 'Perfil',
      history: 'Histórico',
      type: {
        individual: 'Pessoa Física',
        company: 'Pessoa Jurídica'
      }
    },
    notifications: {
      title: 'Notificações',
      unread: 'Não lidas',
      markAsRead: 'Marcar como lida',
      clearAll: 'Limpar todas',
      empty: 'Nenhuma notificação',
      types: {
        alert: 'Alerta',
        inventory: 'Estoque',
        financial: 'Financeiro',
        system: 'Sistema'
      }
    },
    errors: {
      general: 'Ocorreu um erro. Tente novamente.',
      notFound: 'Página não encontrada',
      unauthorized: 'Acesso não autorizado',
      validation: 'Por favor, verifique os campos destacados'
    }
  }
};