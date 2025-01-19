export type ProductData = {
    product_price: number;
    product_description: string;
    product_sustainability: string;
    product_quality: string;
  };

export type RootStackParamList = {
    NotFoundScreen: undefined;
    HomeScreen: undefined;
    EnterText: undefined;
    DisplayResults: { productData: ProductData }; // The 'DisplayResults' screen expects 'data' as a parameter
};