import axios from 'axios';
import React, { useEffect, useState } from 'react';
import loader from '../assets/loader.gif';
import { useNavigate } from 'react-router-dom';


const Category = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading,setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error,setError] = useState('');
  let navigate = useNavigate();

  const detailRoute = (id)=>{
    navigate('/detail/'+id);
  }

  const editRoute = (id)=>{
    navigate('/edit/'+id);
  }

  const deleteData = (id,imgLink)=>{
    if(window.confirm('are you sure ?'))
    {
      axios.delete('http://www.localhost:3000/category?'+'id='+id+'&imageUrl='+imgLink)
      .then(res=>{
        console.log(res);
        getData();
      })
      .catch(err=>{
        console.log(err);
      })
    }
    else
    {
      console.log('cancel');
    }
  }

  const getData = () =>{
    axios.get('http://www.localhost:3000/category')
      .then((res) => {
        setHasError(false);
        setLoading(false);
        console.log(res.data.category);
        setCategoryList(res.data.category);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data.message);
        setHasError(true);
        setError(err.response.data.message);
      });
  }

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);


  return (
    <>
    {!hasError && isLoading && <div>
      <img style={{ width: '150px' }} src={loader} alt="loader"/>
    </div>}

      {!isLoading && <div>
        <h1>Category List</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {categoryList?.map(data=><Row key={data._id} detailReq={detailRoute} editReq={editRoute} deleteReq={deleteData} detail={data} />)}
          </tbody>
        </table>
      </div>}

      {hasError && <div>
          <p style={{color:'red'}}>Error - {error}</p>
      </div>}
    </>
  );
};


const Row = (props)=>{


  console.log(props)
  return(
    <tr>
      <td>{props.detail.name}</td>
      <td>
        <img style={{ width: '150px' }} src={props.detail.photo} alt={"detail"} />  
      </td>
      <td><button onClick={()=>{props.detailReq(props.detail._id)}}>Detail</button></td>
      <td><button onClick={()=>{props.editReq(props.detail._id)}}>Edit</button></td>
      <td><button onClick={()=>{props.deleteReq(props.detail._id,props.detail.photo)}}>Delete</button></td>
    </tr>
  )
}
export default Category;
