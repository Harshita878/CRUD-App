import axios from 'axios';
import React, { useEffect, useState } from 'react';
import imageLogo from '../assets/imageLogo.jpg';
import loader from '../assets/loader.gif';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {

    const [category,setCategory] = useState('');
    const [selectedFile,setSelectedFile] = useState(null);
    const [imageUrl,setImageUrl] = useState(imageLogo);
    const [isLoading,setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [error,setError] = useState('');
    
    let navigate = useNavigate();
    let params = useParams();
    
    useEffect(()=>{
        setLoading(true);
        axios.get('http://www.localhost:3000/category/'+params.id)
        .then(res=>{
            setHasError(false);
            console.log(res.data.category);
            setCategory(res.data.category.name);
            setImageUrl(res.data.category.photo);
            setLoading(false);
        })
        .catch(err=>{
            console.log(err);
            setLoading(false);
            setHasError(true);
            setError(err.response.data.message);
        })
    },[])

    
    const fileHandler = (e) =>{
        setSelectedFile(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
      const submitHandler = (event) => {
        
        event.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('name',category);
        formData.append('photo',selectedFile);
    
        axios.put('http://www.localhost:3000/category/'+params.id,formData)
        .then(res=>{
            console.log(res);
            setLoading(false);
            navigate('/category');
        })
        .catch(err=>{
            console.log(err);
            setLoading(false);
            setHasError(true);
            setError(err.message);
        })
    
      }
    
      return (
        <>
        {isLoading && <div>
            <img style={{ width: '150px' }} src={loader} alt="loader"/>
        </div>}
    
          {!isLoading && <div>
            <h1>Add New Category</h1>
            <form onSubmit={submitHandler}>
              <input value={category} onChange={(e)=>{setCategory(e.target.value)}} type="text"/>
              <input onChange={(e)=>{fileHandler(e)}}type="file"/>
              <button type="submit">Submit</button>
              <br/>
              <img style={{ width: '150px' }} src={imageUrl} alt="Category" />
            </form>
          </div>}
    
          {hasError && <div>
              <p style={{color:'red'}}>Error - {error}</p>
          </div>}
        </>
      )
    }
    

export default Update