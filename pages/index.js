import Image from 'next/image'
import { Inter } from 'next/font/google'
import sent from '../public/imagesent.png'
import { useState } from 'react'
import axios from 'axios';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [input, setInput] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleSubmitChange = (event) => {
    setInput(event.target.value);
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/respell', {
        input: input,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 300000,
      });
  
      if (!response.status === 200) {
        throw new Error('Failed to fetch data from the API');
      }
  
      const data = response.data;
      setResponseData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={`h-screen items-center w-full h-full`}>
      <div className={`flex mx-auto px-4 py-6 w-1/2 h-4/5 items-center rounded-xl`}>
        <div className={`grid bg-gray-900 mx-2 my-2 rounded-md w-full h-full place-content-end overflow-auto`}>
            <div className={`m-6 w-fit h-fit overflow-hidden text-4xl`}>
                {responseData && <div>{responseData.output}</div>}
                <div className={`w-full h-1/6`}> </div>
            </div>
        </div>
      </div>
      <div className={`flex bg-black-100 w-1/2 mx-auto rounded-xl`}>
        <input className={`flex bg-gray-900 p-5 w-11/12 mx-auto rounded-xl mr-10`} placeholder='Escribe tu consulta...' onChange={handleSubmitChange}>
        </input>
        <button className={`flex w-1/12`} onClick={handleSubmit}>
          <Image src={sent} style={{filter: 'invert(100%'}}/>
        </button>
      </div>
    </div>
  )
}
