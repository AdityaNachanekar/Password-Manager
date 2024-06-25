import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Content = () => {
    const [Data, setData] = useState([]);
    const [editing_Elem, setEditing_Elem] = useState(-1);

    useEffect(() => {
        window.addEventListener("resize", (e) => {
            document.querySelector('main').style.height = (document.querySelector('html').clientHeight - document.querySelector('header').clientHeight - document.querySelector('footer').clientHeight) + "px";

            document.querySelector('.pass-cont').style.maxHeight = (document.querySelector('main').clientHeight - document.querySelector('#form-cont').clientHeight - 100)+"px";
        });

        document.querySelector('main').style.height = (document.querySelector('html').clientHeight - document.querySelector('header').clientHeight - document.querySelector('footer').clientHeight) + "px";

        document.querySelector('.pass-cont').style.maxHeight = (document.querySelector('main').clientHeight - document.querySelector('#form-cont').clientHeight - 100)+"px";

        try {
            let data = JSON.parse(localStorage.getItem("passwords"));
            if(data.length > 0){
                setData(data);
            }else{
                localStorage.setItem("passwords", JSON.stringify(Data));
            }
        } catch (error) {
            localStorage.setItem("passwords", JSON.stringify(Data));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("passwords", JSON.stringify(Data));
    }, [Data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(editing_Elem != -1){
            let new_Data = Data.map((elem, index) => {
                if(index == (editing_Elem*1)){
                    return {
                        url: e.target[0].value,
                        username: e.target[1].value,
                        password: e.target[2].value,
                        edit: false
                    };
                }else{
                    return elem;
                }
            })
            setData(new_Data);
            setEditing_Elem(-1);
            toast('Password Updated Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }else{
            setData([...Data, {
                url: e.target[0].value,
                username: e.target[1].value,
                password: e.target[2].value,
                edit: false
            }]);
            toast('Password Saved Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        e.target.reset();
    }

    const showPassword = (e) => {
        if(e.target.src == "https://img.icons8.com/fluency-systems-regular/48/visible--v1.png"){
            e.target.src = "https://img.icons8.com/fluency-systems-regular/48/hide.png";
            e.target.parentElement.firstChild.setAttribute("type", "password");
        }else{
            e.target.src = "https://img.icons8.com/fluency-systems-regular/48/visible--v1.png";
            e.target.parentElement.firstChild.setAttribute("type", "text");
        }
    }

    const handleEdit = (e) => {
        let edit = e.target.parentElement.parentElement.getAttribute("data-el-num");
        setEditing_Elem(edit);
        document.getElementById("URL").value = Data.at(edit).url;
        document.getElementById("username").value = Data.at(edit).username;
        document.getElementById("password").value = Data.at(edit).password;
    }

    const handleDelete = (e) => {
        if(editing_Elem == -1){
            let confirm_mess = confirm("Are you sure you want to Delete?");
            if(confirm_mess) {
                let edit = e.target.parentElement.parentElement.getAttribute("data-el-num");
                let new_Data = Data.filter((elem, index) => {
                    if(index != edit){
                        return elem;
                    }
                });
                setData(new_Data);
                toast('Password Deleted Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }else {
            toast('Please Save the Edit going on...', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const copyToClipboard = (e) => {
        let copyText = e.target.parentElement.parentElement.firstChild;
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
     
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    return (
        <main className='container lg:w-4/5 xl:w-2/3 mx-auto py-4'>
            <ToastContainer />
            <div id='form-cont'>
                <h1 className='text-3xl text-center font-bold'><span className='text-green-500'>&lt;</span>Pass<span className='text-green-500'>OP/&gt;</span></h1>
                <p className='text-center font-medium text-gray-400 my-2'>Your own Password Manager</p>
                <form onSubmit={handleSubmit} className='p-2'>
                    <div className='flex justify-center items-center'>
                        <input type="text" name='URL' id='URL' className='w-full h-9 px-3 border-2 outline-green-600 border-green-300 rounded-lg' placeholder='Enter Website URL eg., https://github.com' required autoComplete='off' />
                    </div>
                    <div className='flex justify-center gap-4 items-center flex-col lg:flex-row my-4'>
                        <input type="text" name='username' id='username' className='w-full h-9 px-3 border-2 outline-green-600 border-green-300 rounded-lg' placeholder='Enter Username' required autoComplete='off' />
                        <div className='lg:w-3/12 w-full h-9 relative flex justify-center items-center'>
                            <input type="password" name='password' id='password' className='pl-3 pr-8 border-2 border-green-300 rounded-lg outline-green-600 h-full w-full' placeholder='Enter Password' required autoComplete='off' />
                            <img onClick={showPassword} width="18" height="18" src="https://img.icons8.com/fluency-systems-regular/48/hide.png" className='absolute right-2 cursor-pointer' alt="hide"/>
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button className='bg-green-500 text-white font-bold px-4 py-2 rounded-full'>Save</button>
                    </div>
                </form>
            </div>
            <div className='my-2 p-2 min-h-60 max-h-60'>
                <h2 className='text-xl font-bold'>Your Passwords</h2>
                <div className='pass-cont my-2 overflow-auto'>
                    <table className='w-full border-separate border-spacing-0'>
                        <thead className='bg-green-700 text-white sticky z-20 top-0'>
                            <tr>
                                <th className='border-2 border-green-700 max-w-sm'>Site</th>
                                <th className='border-2 border-green-700'>Username</th>
                                <th className='border-2 border-green-700'>Password</th>
                                <th className='border-2 border-green-700'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-50'>
                            {
                                Data.length <= 0?<tr className='text-center font-bold text-xl'><td className='border border-green-300' colSpan={4}>No Saved Password to Display</td></tr>:""
                            }
                            {
                                Data.map((item, index) => {
                                    return(
                                        <tr className={editing_Elem==index?'text-center bg-gray-300':'text-center'} data-el-num={index} key={index}>
                                            <td className='border relative border-green-300 overflow-hidden'>
                                                <input type="text" name={'url-'+index} id={'url-'+index} disabled className='pl-3 pr-8 text-center outline-none bg-transparent h-full w-full' autoComplete='off' value={item.url}/>
                                                <span onClick={copyToClipboard} className='absolute right-1 h-full flex justify-center items-center top-0'>
                                                    <img width="18" height="18" className='cursor-pointer' src="https://img.icons8.com/material-sharp/24/copy.png" alt="copy"/>
                                                </span>
                                            </td>
                                            <td className='border relative border-green-300 overflow-hidden'>
                                                <input type="text" name={'username-'+index} id={'username-'+index} disabled className='pl-3 pr-8 text-center outline-none bg-transparent h-full w-full' autoComplete='off' value={item.username}/>
                                                <span onClick={copyToClipboard} className='absolute right-1 h-full flex justify-center items-center top-0'>
                                                    <img width="18" height="18" className='cursor-pointer' src="https://img.icons8.com/material-sharp/24/copy.png" alt="copy"/>
                                                </span>
                                            </td>
                                            <td className='border relative border-green-300 overflow-hidden'>
                                                <input type="password" name={'password-'+index} id={'password-'+index} disabled className='pl-3 pr-8 text-center outline-none bg-transparent h-full w-full' autoComplete='off' value={item.password}/>
                                                <span onClick={copyToClipboard} className='absolute right-1 h-full flex justify-center items-center top-0'>
                                                    <img width="18" height="18" className='cursor-pointer' src="https://img.icons8.com/material-sharp/24/copy.png" alt="copy"/>
                                                </span>
                                            </td>
                                            <td className='border border-green-300 flex justify-center items-center gap-2'>
                                                <img onClick={handleEdit} width="26" height="26" src="https://img.icons8.com/color/48/edit--v1.png" alt="edit--v1" className='cursor-pointer'/>
                                                <img onClick={handleDelete} width="26" height="26" src="https://img.icons8.com/plasticine/100/filled-trash.png" alt="filled-trash" className='cursor-pointer'/>
                                            </td>
                                        </tr>
                                    );
                                })
                            }  
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}

export default Content
