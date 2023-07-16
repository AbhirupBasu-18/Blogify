import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import BlogSection from "../components/BlogSection";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { toast } from "react-toastify";
import Tags from "../components/Tags";
import FeatureBlogs from "../components/FeatureBlogs";
import Trending from "../components/Trending";


const Home = ({ setActive, user, active }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [trendBlogs, setTrendBlogs] = useState([]);
  // eslint-disable-next-line
  const [totalBlogs, setTotalBlogs] = useState(null);
  const [likeBlogs, setLikeBlogs] = useState([]);
 // const queryString = useQuery();
 
  const getTrendingBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const trendQuery = query(blogRef, where("trending", "==", "yes"));
    const querySnapshot = await getDocs(trendQuery);
    let trendBlogs = [];
    querySnapshot?.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data() });
    });
    setTrendBlogs(trendBlogs);
  };
  const getlikeBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const likeQuery = query(blogRef, orderBy("likes","desc"), limit(3));
    const likeSnapshot = await getDocs(likeQuery);
    let likeBlogs = [];
    likeSnapshot?.forEach((doc) => {
      likeBlogs.push({ id: doc.id, ...doc.data() });
    });
    setLikeBlogs(likeBlogs);
  };
  useEffect(() => {
    //console.log("first");
    setLoading(true);
    getTrendingBlogs();
    //setSearch("");
    const res1=async()=>{
      //setLoading(true);
      await getBlogs();
      await getlikeBlogs();
      await getTrendingBlogs();
      //setHide(false);
      setLoading(false);
     // console.log("second");
    };
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        let tags = [];
        //console.log("y");
        snapshot?.docs?.forEach((doc) => {
          //console.log("x");
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setTotalBlogs(list);
        // setBlogs(list);
        //setLoading(false);
        //setActive("home");
      },
      (error) => {
        console.log(error);
      }
    );
    res1();
setActive("home");
    return () => {
      unsub();
      getTrendingBlogs();
    };
  }, [setActive, active]);
  
  
  
  
  useEffect( () => {
    const res=async()=>{
      setLoading(true);
      await getBlogs();
      await getlikeBlogs();
      await getTrendingBlogs();
      //setHide(false);
      setLoading(false);
      //console.log("second");
    };
    res();
  }, [active]);

  const getBlogs = async () => {
    const blogRef = collection(db, "blogs");
      const docSnapshot = await getDocs(blogRef);
      setBlogs(docSnapshot?.docs?.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  //console.log("blogs", blogs);

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure wanted to delete that blog ?")) {
      try {
        //setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
          getTrendingBlogs();
          // eslint-disable-next-line
      const unsub = onSnapshot(
        collection(db, "blogs"),
        (snapshot) => {
          let list = [];
          let tags = [];
          snapshot?.docs?.forEach((doc) => {
            tags.push(...doc.get("tags"));
            list.push({ id: doc.id, ...doc.data() });
          });
          const uniqueTags = [...new Set(tags)];
          setTags(uniqueTags);
          setTotalBlogs(list);
          // setBlogs(list);
          //setLoading(false);
          setActive("home");
        },
        (error) => {
          console.log(error);
        }
      );
       await getBlogs();
       await getlikeBlogs();
       await getTrendingBlogs();
          toast.success("Blog deleted successfully");
        //setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <div className="row mx-0">
          <Trending blogs={trendBlogs} />
          <div className="col-md-8">
            <div className="blog-heading text-start py-2 mb-4">Daily Blogs</div>
            {blogs?.length!==0? blogs?.map((blog) => (
              <BlogSection
                key={blog.id}
                user={user}
                handleDelete={handleDelete}
                {...blog}
              />
            )):<div>Add Blogs</div>}

          </div>
          <div className="col-md-3">
            <div className="blog-heading text-start py-2 mb-4">Tags</div>
            <Tags tags={tags} />
            <FeatureBlogs title={"Most Popular"} blogs={likeBlogs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;