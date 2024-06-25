import React from 'react'

const Navbar = () => {
  return (
    <header className='bg-gray-800'>
      <nav className='container mx-auto flex justify-between items-center p-3'>
        <div>
            <h1 className='text-xl text-white font-bold'><span className='text-green-500'>&lt;</span>Pass<span className='text-green-500'>OP/&gt;</span></h1>
        </div>
        <div>
            <a href='https://github.com/AdityaNachanekar' target='_blank' className='text-white font-bold bg-green-600 border border-white rounded-3xl flex justify-center items-center gap-1'>
                <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/github.png" alt="github" className='invert'/>
                <span className='pr-2'>Github</span>
            </a>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
