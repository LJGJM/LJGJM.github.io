"use strict";

class Cached {
    constructor(filename) {
        if(!filename.match(/\.(css|png|gif|svg)$/))
            throw new Error("Not supported file format");
        window['CachedStorage']=typeof window['CachedStorage']==='undefined'?{}:window.CachedStorage;
        this.cdn_host='https://cloudfront.tryfunstorage.com/';
        this.filename=filename;
        this.period_ms=300000;
        if (typeof CachedStorage[filename]==='undefined') {
            CachedStorage[filename]={cached:false,date:0}
        }
    }
    async get() {
        if (CachedStorage[this.filename].cached!==false&&CachedStorage[this.filename].date>Date.now()-this.period_ms)
            return CachedStorage[this.filename].cached;
        try {
            let resp=await fetch(this.cdn_host+this.filename);
            CachedStorage[this.filename].cached=await resp.text();
        } catch (error) {
            if(CachedStorage[this.filename].cached)
                return CachedStorage[this.filename].cached.toString()
        }
        CachedStorage[this.filename].date=Date.now();
        return CachedStorage[this.filename].cached.toString()
    }
}