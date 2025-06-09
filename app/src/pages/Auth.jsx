import React, { useState } from 'react'


function Auth() {
  const [form , setForm] = useState({});

  async function submitForm(e)
  {
    e.preventDefault();
    const server_url = import.meta.env.VITE_SERVER_URL;
    console.log(server_url);

    const response = await fetch(`${server_url}/auth`,{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify(form)
    })
    const data = await response.json();
    console.log(data);
    
    if(data.success){
      alert(data.message);
      localStorage.setItem("username" , form.username );

    }else{
      alert(data.error);
    }
  }


  return (
    <div>
      <form onSubmit={ e=>submitForm(e) } >
        <input
          className='p-2 m-2 w-50 bg bg-stone-500 rounded-md'
          placeholder='username'
          onChange={ e => setForm( prevData => ( { ...prevData , username:e.target.value } ) ) }
        />
        <br/>
        <input
          className='p-2 m-2 w-50 bg bg-stone-500 rounded-md'
          placeholder='password'
          onChange={ e => setForm( prevData => ( { ...prevData , password:e.target.value } ) ) }
        />
        <br/>
        <button
          className='p-2 m-2 w-50 bg bg-stone-500 rounded-md'
          onClick={ e => submitForm(e) }
        >Login/Register</button>
      </form>
    </div>
  )
}

export default Auth