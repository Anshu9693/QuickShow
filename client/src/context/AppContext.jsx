import { createContext, use, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


export const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [isAdmin, setisAdmin] = useState(false);
  const [shows, setShows] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
  const { user } = useUser();
  const { getToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(useAuth());
  
  // Check if the user is an admin
  const fetchIsAdmin = async () => {
    try {
      const {data} = await axios.get("/api/admin/is-admin", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
        setisAdmin(data.isAdmin);
        if(!data.isAdmin && location.pathname.startsWith("/admin")){
         navigate("/");
         toast.error("You are not authorized to access admin dashboard");
        }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all shows

  const fetchShows = async () => {
    try {
      const { data } = await axios.get("/api/show/all");
     if(data.shows) {
        setShows(data.shows); 
     }else{
        toast.error(data.message);
     }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch favorite movies

  const fetchFavoriteMovies = async () => {
    try {
        const {data} = await axios.get("/api/user/favorite", {
            headers: {
                Authorization: `Bearer ${await getToken()}`,
            },
        });
        if(data.success){
            setFavoriteMovies([...data.movies]);
        }
        else{
            toast.error("here is problem "+data.message);
            console.log("here is problem")
        }
    } catch (error) {
        
    }

  }

  

  /// Calling functions 

  useEffect(() => {
    if (user) {
      fetchIsAdmin();
      fetchFavoriteMovies();
    }
  }, [user]);

  useEffect(() => {
    fetchShows()
  }, [])
  


  /// Context value

  const value = {
    axios ,
    fetchIsAdmin,
    user,
    getToken,
    navigate,
    isAdmin,
    shows, 
    favoriteMovies,
    fetchFavoriteMovies,
    image_base_url
    };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
