type RefundAPIResponse = {
  id: string;
  userId: string;
  name: string;
  category: CategoriesAPIEnum;
  amount: number;
  filename: string;
  fileUrl?: string;
  publicId?: string;
  user: {
    name: string;
  };
};

type UploadAPIResponse = {
  filename: string;
  fileUrl: string;
  publicId: string;
};

type RefundsPaginationAPIResponse = {
  refunds: RefundAPIResponse[];
  pagination: {
    page: number;
    perPage: number;
    totalRecords: number;
    totalPages: number;
  };
};
