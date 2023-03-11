export const customerCollums = [
  {
    field: "_id",
    headerName: "ID",
  },
  {
    field: "name",
    headerName: "Nome",
  },
  {
    field: "email",
    headerName: "Email",
  },
  {
    field: "phoneNumber",
    headerName: "Telefone",
    renderCell: (params: string) => {
      return params.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    },
  },
  {
    field: "country",
    headerName: "País",
  },
  {
    field: "occupation",
    headerName: "Ocupação",
  },
  {
    field: "role",
    headerName: "Função",
    disableSort: true,
  },
];

export const transactionCollums = [
  {
    field: "_id",
    headerName: "ID",
  },
  {
    field: "userId",
    headerName: "User ID",
  },
  {
    field: "createdAt",
    headerName: "Criado Em",
  },
  {
    field: "products",
    headerName: "# De Produtos",
    renderCell: (params: []) => params.length.toString(),
    disableSort: true,
  },
  {
    field: "cost",
    headerName: "Custo",
    renderCell: (params: number) => `$${params.toFixed(2)}`,
  },
];
