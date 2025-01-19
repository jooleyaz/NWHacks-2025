import axios from 'axios';

export const scrapeProductData = async (url: string[], setProductData: React.Dispatch<React.SetStateAction<any>>) => {
        try {
            console.log("URL payload:", url);
            const response = await axios.post('http://206.87.193.193:3000/extract', url); // problem
            console.log(response.data);
            setProductData({
                product_price: response.data.product_price,
                product_description: response.data.product_description,
                product_sustainability: response.data.product_sustainability || 'No data available',
                product_quality: response.data.product_quality || 'No data available',
            });
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