import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChannelContext } from "../contexts/ChannelContext";
import styles from '../styles/CategoriesList.module.css'


const CategoriesList = () => {
    
    const history = useHistory()
    const { categories } = useContext(ChannelContext);

    useEffect(() => {
        console.log(`categories are`, categories)
        
    }, [categories]);
    
    const redirectToPragramsPage =(categoryId) => {
        history.push(`/programs/getbycategoryid/${categoryId}`)
    }

    let content = ''

    if(categories) {
        let fetchedCategories = categories.programcategories
        
        content = <div className={`container`}>
                  <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-2 g-lg-3">
                  {fetchedCategories.map((category, i) => (
                        <div className="col" onClick={()=>redirectToPragramsPage(category.id)}>
                            <p key={i} className={styles.categoryParag}>{category.name}</p>
                        </div>
                    ))}
                   
                  </div>
                </div>
               

                 
                
    } else {
        content = <div>Loading...</div>
    }

    return (
        <div className={`${styles.categoriesWrapper}`}>
           <h1>Alla kategorier</h1>
            {content}
            
        </div>
    );
};

export default CategoriesList;
