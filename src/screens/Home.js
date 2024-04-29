import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import Card from '../components/Card';


export default function Home() {
  const [Search, setSearch] = useState("")
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    });
    response = await response.json()
    setFoodCat(response[1]);
    setFoodItems(response[0])
    console.log(response[0])
    // console.log(foodCat)
    // console.log(foodItems)

  }

  useEffect(() => {
    loadData()
  }, [])





  return (
    <>
      <div>
        <Navbar />
      </div>
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade" style={{ objectFit: "contain !important" }}>
        <div className="carousel-inner" id='carousel' style={{ maxHeight: "500px" }}>
          <div className='carousel-caption' style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center" role="search">
              <input className="form-control me-2 bg-transparent" type="search" 
              placeholder="Search" aria-label="Search" 
              value={Search} 
              onChange={(e) => { setSearch(e.target.value) }} />
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/900×700/?pizza" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?pastry" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?barbeque" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div></div>

      <div className='container'>
        {
          foodCat !== []
            ? foodCat.map((data) => {
              return (<div className='row mb-3'>
                <div key={data._id} className='fs-3 m-3'>
                  {data.CategoryName}
                </div>
                <hr />

                {foodItems !== []
                  ? foodItems.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(Search.toLocaleLowerCase())))
                  .map((filterItems) => {
                    return (
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 m-3'>
                        <Card
                          foodItems = {filterItems}
                          foodOptions={filterItems.options[0]}
                          
                        />
                      </div>)
                  })
                  : <div>""""""""""</div>
                }
              </div>

              )
            })
            : <div>""""""""""</div>
        }

      </div >
      <div> <Footer /> </div>
    </>

  )
}
