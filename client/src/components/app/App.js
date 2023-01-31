import './App.css';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <div className="header row d-flex justify-content-around">
          <div className="col-2">
            <button type="button" className="header-btn btn btn-outline-primary">Информация</button>
          </div>
          <div className="col-2">
            <button type="button" className="header-btn btn btn-outline-primary">Сон</button>
          </div>
          <div className="col-2">
            <button type="button" className="header-btn btn btn-outline-primary">Еда</button>
          </div>    
        </div>
        <div className="image-block">
          <div className='col-10 row'>
              <div className='col-4'>
                <img className='.img-thumbnail' width="350" height="300" src='https://www.ixbt.com/img/x780/n1/news/2021/9/5/d5d11c91b095686fcaa0f14cf8bbb7fa-600x450_large.jpg' alt='food'/>
              </div>
              <div className='col-6'>
                <span> 14:24</span>
              </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
