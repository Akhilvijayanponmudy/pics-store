
const homePage = async (req, res) => {
  
const categories={};
    res.render('user/home/home', { categories });


};


module.exports = { homePage};