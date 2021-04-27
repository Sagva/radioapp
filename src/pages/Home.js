import ChannelList from "../components/ChannelList";
import CategoriesList from "../components/CategoriesList";
import ChannelPrograms from "../components/ChannelPrograms";


const HomePage = () => {
    
    return (
        <div>
            <CategoriesList/>
            
            <ChannelList/>
            <ChannelPrograms/>
        </div>
    );
};

export default HomePage;
