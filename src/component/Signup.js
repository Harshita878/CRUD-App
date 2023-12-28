import React from 'react'

const Signup = () => {
  return (
    <>
        <h1>Create Account</h1>
        <form>
            <input type="text" placeholder='username' />
            <br/>
            <input type="text" placeholder='password' />
            <br/>
            <input type="text" placeholder='email' />
            <br/>
            <input type="number" placeholder='phone' />
            <br/> 
            <button type='submit'>submit</button>           
        </form>
    </>
  )
}

export default Signup