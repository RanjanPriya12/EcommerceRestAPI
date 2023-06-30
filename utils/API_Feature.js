class ApiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
  
    search() {
      const search = this.queryStr.search
        ? {
            title: {
              $regex: this.queryStr.search,
              $options: "i",
            },
          }
        : {};
  
      this.query = this.query.find({ ...search });
      return this;
    }
  
    rangeFilter() {
      const queryCopy = { ...this.queryStr };
      //   Removing some fields for category
      const removeFields = ["search", "page", "limit"];
  
      removeFields.forEach((key) => delete queryCopy[key]);
  
      // Filter For Price and Rating
  
      let queryStr = JSON.stringify(queryCopy);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
  
      this.query = this.query.find(JSON.parse(queryStr));
  
      return this;
    }


    categoryFilter(){
       const cat = this.queryStr.category;
       console.log(cat);
       if(cat)
      this.query=this.query.find({category:{$options:"i",$regex:`${cat}`}});
      return this;
      
    }

    subCategoryFilter(){
      const subCat = this.queryStr.subCategory;
      console.log(subCat);
      if(cat)
     this.query=this.query.find({subCategory:{$options:"i",$regex:`${subCat}`}});
     return this;
     
   }

    colorFilter(){
      const color = this.queryStr.color;
      console.log(color);
      if(color)
     this.query=this.query.find({color:{$options:"i",$regex:`${color}`}});
     return this;
     
   }

   brandFilter(){
    const brand = this.queryStr.brand;
    console.log(brand);
    if(brand)
   this.query=this.query.find({brand:{$options:"i",$regex:`${brand}`}});
   return this;
   
 }
    
    sorting(){
        const sorting = this.queryStr.sort;
        // console.log(sorting);
        if(sorting){
            this.query=this.query.sort({price:this.queryStr.sort});
        }
        return this;
        
    }
    pagination(resultPerPage) {
      const currentPage = Number(this.queryStr.page) || 1;
  
      const skip = resultPerPage * (currentPage - 1);
  
      this.query = this.query.limit(resultPerPage).skip(skip);
  
      return this;
    }
  }
  
  module.exports = ApiFeatures;