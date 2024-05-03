import { useState,useEffect } from "react";
import axios from "axios";
//import usestate hook

//rfc  command eken puluwn react functional componnet ek gnn
//main page ek meka.app.js eken mekt gtta


export default function MainPage() {

  //state for the form field
  //date: This is a variable that will hold the current state value for the form field.
//Setdate: This is a function that will be used to update the state value. By convention, React state setter functions are named with a prefix of "set" followed by the state variable name (camel-cased).
//useState(): This is a React hook used to add state to a functional component. It takes one argument, which is the initial state value. The initial state value provided here is undefined because no initial value is specified.
//Putting it all together, this line of code is declaring a constant variable named date that will hold the state value for a form field. The Setdate function will be used to update this state value. Initially, the state value is undefined, but it can be updated later using Setdate.
  const [date, Setdate] = useState();

  //dan api sourcecurrency ekk select krma form eken. ita anuwa me yata tyna sourceCurrency kyn state variable ek wens wens wenn oni

  const [sourceCurrency, setsourceCurrency] = useState("");
  const [targetCurrency, settargetCurrency] = useState("");
  const [amountInSourceCurrency, setamountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setamountInTargetCurrency] = useState(0);
  
  
  const [sourceCurrencyName,setsourceCurrencyName] = useState("");
  const [targetCurrencyName, settargetCurrencyName] = useState("");

   //me yata ek haduwe name tika display krnna mulin.array ekk inputr wen nisa array widiht daanna
  const [currencyNames, setcurrencyNames] = useState([]);
  const [pressed, setPressed] = useState(false);


  //meka run wen hama wathawema load wenn oni currencies tika athana display wenn nm. ekt useeffect hook ek use krnw
   //get all the currencies
   useEffect(() => {
    const getTheCurrencies = async () => {
      try {
        //serverv side eke me function ek hdnw
        //responce kyn ekt enw adaala valu tika
        const responce = await axios.get(
          "http://localhost:5000/getAllCurrencies"
        );
        setcurrencyNames(responce.data);
      } catch (err) {
        console.error(err);
      }
    };
    //uda function ek cl krgtta
    getTheCurrencies();
  }, []);

  // onSubmit
  const getTheTargetAmount = async (event) => {
    event.preventDefault();
    setPressed(true);
    // send the data
    try {
      //me yata parameters input ekk widiht API ekt ywnn oni 
      const responce = await axios.get("http://localhost:5000/convert", {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },
      });

      const { amountInTargetCurrency } = responce.data;
      //currencyNames
      const { sourceCurrencyName, targetCurrencyName } = responce.data;
      setsourceCurrencyName(sourceCurrencyName);
      settargetCurrencyName(targetCurrencyName);
      setamountInTargetCurrency(amountInTargetCurrency);
    } catch (err) {
      console.error(err);
    }
  };
  return (

    //me yt tynnee okkoma nikn form ek hduw ek. uda tynne function em
    <div>
      {/* yata 5xl em kyl dala tyne font size ek. okkom inline css wge tailwind css nisa.lg:mx kynne largescreen size wlt yddi margin ekk add wenn kyl. x direction kynne harahata.y direction kynne top and bottom*/}
    <h1 className="lg:mx-32  text-5xl font-black flex items-center justify-normal text-green-500">
      Convert Your Currencies Today
    </h1>
    <p className="lg:mx-32 font-sm opacity-40 py-6">
      {/* py kynne padding add wela top and bottom ekt */}
      Welcome to "Convert Your Currencies Today"! This application allows you
      to easily convert currencies based on the latest exchange rates. Whether
      you're planning a trip, managing your finances, or simply curious about
      the value of your money in different currencies, this tool is here to
      help.
    </p>
{/* 
    yata hdnne input field tika . hama ekkm div athule hdnne style krnn lesi wenn */}
    <div className=" mt-5 flex items-center justify-center flex-col">
      <section className="w-full lg:w-1/2"> 
       {/*  large scrren siz wldi screen ek half wenn ud ek damme  */}
        <form onSubmit={getTheTargetAmount}>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              //me date kynne uda function wl state variable ekk(html daagtte date kyn ektne)
              htmlFor="date"
            >
              Date
            </label>
            <input
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"

              //below line of code is setting up an onChange event handler for a form input element. When the value of the input changes, the Setdate function is called with the new value.

//Let's break it down:

//onChange: This is an event handler attribute in React that triggers when the value of an input element changes.
//(e) => Setdate(e.target.value): This is an arrow function that takes an event object e as its parameter. Inside the function, e.target.value is used to get the new value of the input element that triggered the event. This value is then passed to the Setdate function to update the state variable date with the new value.
//In summary, this line of code ensures that whenever the value of the input element changes, the date state variable is updated with the new value. dan user dena data ek uda date ek widiht set wenw
              onChange={(e) => Setdate(e.target.value)}
              type="date"
              name="date"
              id="date"
              placeholder="date.."
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="sourceCurrency"
            >
              Source Currency
            </label>


          {/* methana input ekk newene enn oni. select krl gnn ekkne */}
            <select
              value={sourceCurrency} // Set the selected value
              onChange={(e) => setsourceCurrency(e.target.value)}
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              name="sourceCurrency"
              id="sourceCurrency"
            >
              <option value="">Select source currency</option>{" "}
              {/* Default empty option */}
{/* 
              currencyNames kyn ekt gnnw udin API mgin okkoma currency name tika.option widiht ew daagnnw */}
              {Object.keys(currencyNames).map((currency) => (
                <option className=" p-1" key={currency} value={currency}>
                  {currencyNames[currency]}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="targetCurrency"
            >
              Target Currency
            </label>
            <select
              value={targetCurrency} // Set the selected value
              onChange={(e) => settargetCurrency(e.target.value)}
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              name="targetCurrency"
              id="targetCurrency"
            >
              <option value="">Select target currency</option>{" "}
              {/* Default empty option */}
              {Object.keys(currencyNames).map((currency) => (
                <option className=" p-1" key={currency} value={currency}>
                  {currencyNames[currency]}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="amountInSourceCurrency"
            >
              Amount in source currency
            </label>
            <input
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              onChange={(e) => setamountInSourceCurrency(e.target.value)}
              type="number"
              name="amountInSourceCurrency"
              id="amountInSourceCurrency"
              placeholder="Amount in source currency..."
            />
          </div>

          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Get the target Currency
          </button>
        </form>
      </section>
      <h3 className=" flex items-center justify-start py-5 text-lg">
        {pressed ? (
          <div>
            <span className=" text-xl"> {amountInSourceCurrency}</span>{" "}
            {sourceCurrencyName} is equal to
            <span className=" text-xl font-bold text-green-400">
              {" "}
              {amountInTargetCurrency.toFixed(2)}
            </span>{" "}
            {targetCurrencyName}
          </div>
        ) : (
          ""
        )}
      </h3>
    </div>
    { amountInTargetCurrency }
  </div>
  )
}
