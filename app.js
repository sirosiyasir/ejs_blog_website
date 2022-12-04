/* bu projenin çalışması için node_modules'i yükleyin; express , body-parser ve ejs npm'lerini indirin
daha sonra nodemon app.js komutuyla (hyper vb) nodemon'u çalıştırın. Sonra tarayıcınızda local host 3000'de açın.
nodemon app.js komutu çalışmıyorsa npx nodemon app 'i deneyin. localhost:3000/compose 'a giderek yeni günlük ekleyebilirsiniz */

//indirdiğim npm paketlerini proje dahil ediyorum
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// _.kebabCase'i kullanmak için lodash npm'ini kurdum
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
// ejs'i dahil ettik
app.set('view engine', 'ejs');

// bodyParser'ı projemize ekledik
app.use(bodyParser.urlencoded({extended: true}));
// public klasörünü yani css vb. projemize dahil ettik
app.use(express.static("public"));

// javascript object'ini içine itebilmek için bir array oluşturuyoruz
const posts = []

/* app.get sayesinde yeni sayfalar oluşturuyoruz. {} içerisindeki ör: homeStartingContent'lerden ikincisi yukarıda oluşturduğumuz const'tur ilki de home sayfasında 
<%= %>'la dahil ettiğimiz isim */
app.get("/", function(req,res) {
  res.render("home", {homeStartingContent: homeStartingContent, posts: posts})

})

app.get("/contact", function(req,res) {
  res.render("contact", {contactContent: contactContent})
})

app.get("/about", function(req,res) {
  res.render("about", {aboutContent: aboutContent})
})

app.get("/compose", function(req,res) {
  res.render("compose")
})

/* compose sayfasında oluşturduğum form'dan gelen post isteğini yakalıyorum ve body-parser sayesinde name'ni alıyorum */
app.post("/compose", function(req,res) {
  // javascript objesi oluşturup birden fazla name'i içine koyuyoruz
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody
}

// object'i , oluşturduğumuz posts adlı array'e itiyoruz
posts.push(post)
// objecti oluşturup posts array'ine ittikten sonra tarayıcıyı tekrardan "/" home page'e yönlendiriyoruz
res.redirect("/")
})

// "/posts"tan sonra gelecek herhangi bir parametreyi req.params sayesinde yakalarız , yani ÖR: localhost:3000/posts/yeniblog 'taki yeniblog bir parametredir.
app.get("/posts/:topic", function(req,res) {
  const requestUrl = _.kebabCase(req.params.topic)
  posts.forEach((post) => {
    const title = _.kebabCase(post.title)
    if (requestUrl === title) {
      // post sayfasına yönlendirirken her seferinde yalnızca bir title ve bir body'i göstermesi için posts:posts değil de posts:post dedim
      res.render("post", {posts: post})
    }
  });
})




// sunucuyu localhost: 3000 'de çalıştırmamızı sağlar
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
