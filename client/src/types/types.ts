export interface StepsProps {
  title: string;
  description: string;
  buttonSecondary?: boolean;
  active?: boolean;
  buttonName: string;
  imageUrl: string;
}


export interface CategoryOption {
  label: string;
  value: string;
}

export interface CategoryProps {
  categoryId: string,
  name: string,
  state: boolean
}

export interface SubCategoryProps {
  subCategoryId: string,
  name: string,
  state: boolean
  categoryId: string
}

export interface CountryProps {
  countryId: string,
  name: string,
  state: boolean
}

export interface Option {
  name: string;
  sku: string;
  barCode: string;
  weight: string;
  country: string;
  price: number;
  quantity: number;
  visible: boolean;
  sellingOutStock: boolean;
  isChecked: boolean;
}

export interface SelectedOption {
  id: string;
  variantName: string;
  optionName: string;
}

export interface Variant {
  id: string;
  name: string;
  options: Option[];
  price: number;
  quantity: number;
  isEditing?: boolean;
}

export interface CombinationProps {
  variantName: string;
  variantPrice: number;
  variantQuantity: number;
  optionName: string;
  variantSku: string;
  variantWeight: string;
  variantBarCode: string;
  variantCountry: string;
  variantSellingOutStock: boolean;
  options: Option[];
  visible: boolean;
  isChecked: boolean;
}

export interface ProductProps {
  productId: string;
  subCategoryName: string;
  name: string;
  description: string;
  state: boolean;
  subCategoryId: string;
  product_price: ProductPriceProps;
  organization_product: OrganizationProductProps;
  product_inventory: ProductInventoryProps;
  product_identifier: ProductIdentifierProps;
  product_variants: ProductVariantProps[];
}

interface ProductPriceProps {
  price: number;
  comparePrice: number;
  cost: number;
  revenue: number;
  margin: number;
  isTax: boolean;
}

interface OrganizationProductProps {
  productType: string;
  productVendor: string;
  productCollection: string;
  productTag: string;
  productOrigin: string;
}

interface ProductInventoryProps {
  unitMeasureId: string;
  weight: number;
  minStock: number;
  sellOutStock: boolean;
}

interface ProductIdentifierProps {
  sku: string;
  barCode: string;
}

interface ProductVariantProps {
  name: string;
  product_option_variants: ProductOptionVariantProps[];
}

interface ProductOptionVariantProps {
  name: string;
}

export interface AddProductProps {
  subCategoryId: string,
  name: string,
  description: string,
  state: true,
  productCollection: string,
  productOrigin: string,
  productType: string,
  productTag: string,
  productVendor: string,
  sku: string,
  barCode: string,
  minStock: number,
  sellOutStock: boolean,
  unitMeasureId: string,
  weight: number,
  price: number,
  comparePrice: number,
  cost: number,
  isTax: false,
  product_variants: []
}
