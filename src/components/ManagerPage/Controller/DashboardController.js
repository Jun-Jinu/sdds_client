import React from 'react';
import axios from 'axios';
import { selector, useRecoilValue } from 'recoil';
import { getToken, productState, tokenState, websiteState } from '../../../recoil/Recoil';

export const asyncProductQuery=selector({
    key:'asyncProductQuery',
    get: async ({get}) => {
        let website=get(websiteState);
        let token =get(tokenState);
        const response = await axios.get('http://simplelinuxvm-foic5rddd76ve.koreacentral.cloudapp.azure.com:3000/api/v1/product/'+website,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },
    set: ({set},newValue)=>{
        set(productState,newValue)
    }
})
export const getProducts =async (token,website)=> {
    try {
        const response = await axios.get('http://simplelinuxvm-foic5rddd76ve.koreacentral.cloudapp.azure.com:3000/api/v1/product/'+website,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    }catch(err){
        console.log(err);
    }
}
export const addProduct = async (name,price,category,website,count,thumnail,images,token)=>{
    const frm = new FormData();
    frm.append('name',name);
    frm.append('price',price);
    frm.append('count',count);
    frm.append('website_url',website);
    frm.append('category_name',category);
    let thumnails=[...thumnail];
    thumnails.forEach(ele => frm.append('thumbnail_image',ele))


    let imgs=[...images];
    imgs.forEach(img => frm.append('main_image',img));
    
    try{
        const response=await axios.post('http://simplelinuxvm-foic5rddd76ve.koreacentral.cloudapp.azure.com:3000/api/v1/product',frm,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
    }catch(err){
        console.log(err);
    }
    
}
