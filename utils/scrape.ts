import axios from 'axios';

export const scrapeProductData = async (url: string, setProductData: React.Dispatch<React.SetStateAction<any>>, setIsLoading: React.Dispatch<React.SetStateAction<any>>) => {
        try {
            console.log("URL payload:", url);
            setIsLoading(true);
            const response = await axios.post('http://206.87.193.193:3000/scrape', {url}); // problem
            console.log(response.data);
            setProductData({
                product_price: response.data.product_price || 'No data available',
                product_description: response.data.product_description || 'No data available',
                product_sustainability: response.data.product_sustainability || 'No data available',
                product_quality: response.data.product_quality || 'No data available',
                product_decision: response.data.product_decision
            });
            setIsLoading(false);
            return true;
        } catch (error) {
            console.error("Scraping failed:", error);
        }
    };

    // export const scrapeProductData = async (url: string[], params: [], setProductData: React.Dispatch<React.SetStateAction<any>>) => {
    //     try {
            

    //         const response = await axios.post('http://206.87.193.193:3000/scrape', { url, params });
    //         console.log(response.data);
    //         setProductData({
    //             product_price: response.data.product_price,
    //             product_description: response.data.product_description,
    //             product_sustainability: response.data.product_sustainability || 'No data available',
    //             product_quality: response.data.product_quality || 'No data available',
    //         });
    //         return true;
    //     } catch (error) {
    //         console.error("Scraping failed:", error);
    //     }
    // };