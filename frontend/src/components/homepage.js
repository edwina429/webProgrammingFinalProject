import React from "react";
// import {useState} from 'react';
import "./webpage.css";
import { useState } from "react";
function Vault({navigate}){
  
  return(
      <div>
        <button onClick={() => navigate('vault')} > {/*include style here*/}
          Go to Vault Page
        </button>
      </div>
  );
}







Chart.register(...registerables);

const HomePage = () => {
  const [charts, setCharts] = useState([]);
  const [goals, setGoals] = useState([]);

  const handleAddGoal = () => {
    const goalName = prompt("What's the goal?");
    if (!goalName) return;

    const totalCost = parseFloat(prompt("What's the total cost?"));
    if (isNaN(totalCost) || totalCost <= 0) {
      alert("Please enter a valid total cost.");
      return;
    }

    const amountPaid = parseFloat(prompt("How much have you paid so far?"));
    if (isNaN(amountPaid) || amountPaid < 0 || amountPaid > totalCost) {
      alert("Please enter a valid amount paid (less than or equal to the total cost).\n");
      return;
    }

    const newGoal = { goalName, totalCost, amountPaid };
    setGoals((prevGoals) => [...prevGoals, newGoal]);

    createNewChart(goalName, amountPaid, totalCost);
  };

  const createNewChart = (goalName, amountPaid, totalCost) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [goalName],
        datasets: [
          {
            label: "Amount Paid",
            data: [amountPaid],
            backgroundColor: "#28a745",
          },
          {
            label: "Amount Remaining",
            data: [totalCost - amountPaid],
            backgroundColor: "#ffc107",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Goal Progress",
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    });

    setCharts((prevCharts) => [...prevCharts, { goalName, chartInstance }]);
  };

  const handleDeleteGoal = (goalName) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.goalName !== goalName));
    setCharts((prevCharts) => {
      const chartToRemove = prevCharts.find((chart) => chart.goalName === goalName);
      if (chartToRemove) chartToRemove.chartInstance.destroy();
      return prevCharts.filter((chart) => chart.goalName !== goalName);
    });
  };

  return (
    <div>
      <header className="header">
        <div className="college-logo">
          <h1>College Tracker</h1>
        </div>
      </header>

      <div className="main-menu">
        <button className="Account-button">Account</button>
        <div className="dropdown account-dropdown">
          <a href="#">Past Goals</a>
        </div>

        <button className="Profile-button">Profile</button>
        <div className="dropdown profile-dropdown">
          <a href="#">Settings</a>
          <a href="#">Private Info</a>
          <a href="#">Sign Out</a>
        </div>
      </div>

      <div className="button-section">
        <div className="button-container">
          <button className="New-Goal" onClick={handleAddGoal}>New Goal</button>
        </div>
      </div>

      <div className="content">
        {goals.map((goal) => (
          <div key={goal.goalName} className="goal-item">
            <p>
              Goal: {goal.goalName} | Total Cost: ${goal.totalCost} | Paid: ${goal.amountPaid}
            </p>
            <button onClick={() => handleDeleteGoal(goal.goalName)}>
              Delete "{goal.goalName}" Chart
            </button>
          </div>
        ))}
      </div>

      <div className="calendar-container">
        <div className="calendar">
          <h3>Calendar</h3>
          <table>
            <thead>
              <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
              </tr>
              <tr>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
                <td>10</td>
                <td>11</td>
              </tr>
              <tr>
                <td>12</td>
                <td>13</td>
                <td>14</td>
                <td>15</td>
                <td>16</td>
                <td>17</td>
                <td>18</td>
              </tr>
              <tr>
                <td>19</td>
                <td>20</td>
                <td>21</td>
                <td>22</td>
                <td>23</td>
                <td>24</td>
                <td>25</td>
              </tr>
              <tr>
                <td>26</td>
                <td>27</td>
                <td>28</td>
                <td>29</td>
                <td>30</td>
                <td>31</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};





// function HomePage() {
//   return (
//     <div>
//       {/* Header Section */}
//       <div className="header">
//         <div className="college-logo">
//           <h1>College Tracker</h1>
//         </div>
//       </div>

//       {/* Main Menu */}
//       <div className="main-menu">
//         <button className="Account-button">Account</button>
//         <div className="dropdown account-dropdown">
//           <a href="#">Past Goals</a>
//         </div>

//         <button className="Profile-button">Profile</button>
//         <div className="dropdown profile-dropdown">
//           <a href="#">Settings</a>
//           <a href="#">Private Info</a>
//           <a href="#">Sign Out</a>
//         </div>
//       </div>

//       {/* Button Section */}
//       <div className="button-section">
//         <div className="button-container">
//           <button className="New-Goal" id="new-goal-btn">
//             New Goal
//           </button>
//           <button className="Delete-Goal" id="delete-goal-btn">
//             Delete
//           </button>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="content">
//         <div className="Goal-Chart">
//           <canvas id="goalChart"></canvas>
//         </div>
//       </div>

//       {/* Goal Input Section */}
//       <div className="goal-input" id="goal-input-section" style={{ display: "none" }}>
//         <input type="text" id="goal-name" placeholder="Enter Goal Name" />
//         <input type="number" id="goal-value" placeholder="Enter Goal Value" />
//         <button id="add-goal">Add Goal</button>
//       </div>

//       {/* Calendar Section */}
//       <div className="calendar-container">
//         <div className="calendar">
//           <h3>Calendar</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Sun</th>
//                 <th>Mon</th>
//                 <th>Tue</th>
//                 <th>Wed</th>
//                 <th>Thu</th>
//                 <th>Fri</th>
//                 <th>Sat</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td>1</td>
//                 <td>2</td>
//                 <td>3</td>
//                 <td>4</td>
//               </tr>
//               <tr>
//                 <td>5</td>
//                 <td>6</td>
//                 <td>7</td>
//                 <td>8</td>
//                 <td>9</td>
//                 <td>10</td>
//                 <td>11</td>
//               </tr>
//               <tr>
//                 <td>12</td>
//                 <td>13</td>
//                 <td>14</td>
//                 <td>15</td>
//                 <td>16</td>
//                 <td>17</td>
//                 <td>18</td>
//               </tr>
//               <tr>
//                 <td>19</td>
//                 <td>20</td>
//                 <td>21</td>
//                 <td>22</td>
//                 <td>23</td>
//                 <td>24</td>
//                 <td>25</td>
//               </tr>
//               <tr>
//                 <td>26</td>
//                 <td>27</td>
//                 <td>28</td>
//                 <td>29</td>
//                 <td>30</td>
//                 <td>31</td>
//                 <td></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Goal List Section */}
//       <div className="goal-list" id="goal-list">
//         <h3>Your Goals</h3>
//         <ul id="goals"></ul>
//         <div id="charts-container"></div>
//       </div>
//     </div>
//   );
// }



// start planning for keeping an array of vaults for database purposes
// class Vault{
//     #title;
//     #amount;
//     #goal;

//     constructor(title, amount, goal){
//         this.#title = title;
//         this.#amount = amount;
//         this.#goal = goal;
//     }
//     display(){
//         console.log(this.#title);
//         console.log(this.#amount);
//         console.log(this.#goal);
//     }
//     addMoney(additional){
//         this.#amount += additional;
//         return this.#amount
//     }
//     withdrawMoney(){
//         if(this.#amount >= this.#goal){
//             const withdrawn_amount = this.#amount;
//             this.#amount = 0;
//             return withdrawn_amount;
//         }else{
//             throw new Error("Nice try, but goal not reached yet. Save more money and believe in yourself");
//         }
//     }
//     getTitle(){
//         return this.#title;
//     }
//     getAmount(){
//         return this.#amount;
//     }
//     getGoal(){
//         return this.#goal;
//     }
// }

// function GoalsPage({navigate}){
//     return(
//         <div>
//             <button onClick={() => navigate('goals')} > {/*include style here*/}
//             Go to Goals Page
//             </button>
//         </div>
//     );
// }


// function createVault(){
//     const[visible, setVisibility] = useState(false);
//     const[vault_input, setVault_input] = useState("");
//     const[amount_input, setAmount_input] = useState("");
//     const[goal_input, setGoal_input] = useState("");
//     const[vaults, setVaults] = useState([]);
//     const[additional_input, set_additional_input] = useState({});


//     const toggle_visibility = () => {
//         setVisibility(prevState => !prevState);
//     };
//     const submit = () => {
//         const title = vault_input.trim();
//         const amount = parseFloat(amount_input) || 0;
//         const goal = parseFloat(goal_input) || 0;

//         if(!title || isNaN(amount) || isNaN(goal) || amount < 0 || goal <= 0){
//             alert("Please fill all fields to proceed.");
//             return;
//         }

//         const newVault = new Vault(title, amount, goal);
//         setVaults([...vaults, newVault]);
//         setVault_input("");
//         setAmount_input("");
//         setGoal_input("");
//         setVisibility(false);
//     };

//     const deposit = (index) => {
//         const additional_amount = parseFloat(additional_input[index]) || 0;
//         if(isNaN(additional_amount) || additional_amount <=0){
//             alert("To make a deposit, enter a value of $1 or greater.");
//             return;
//         }
//         setVaults((prevVaults) => {
//             const update = [...prevVaults];
//             update[index].addMoney(additional_amount);
//             return update;
//         });
//         set_additional_input(prev => ({...prev, [index]: ""}));
//     };

//     const withdraw = (index) => {
//         try {
//             const amountwithdrawn = vaults[index].withdrawMoney();
//             alert(`Congratulations! Withdraw Amount: $${amountwithdrawn}`);
//         }catch (error){
//             alert(error.message);
//         }
//     };


//     return (
//         <div className="new-vault">
//             <button onClick={toggle_visibility}>
//                 {visible ? "Cancel" : "Create New Vault"}
//             </button>

//             {visible && (
//                 <div id="create_vault">
//                     <label htmlFor="vault_input">What is this money for?</label>
//                     <input
//                         type="text" id="vaultinput"
//                         placeholder="New House, New Car..."
//                         value={vault_input}
//                         onChange={(e) => setVault_input(e.target.value)}
//                         />

//                     <label htmlFor="amount_input">How much would you like to deposit upfront?</label>
//                     <input
//                         type="text" id="amount"
//                         placeholder="$500"
//                         value={amount_input}
//                         onChange={(e) => setAmount_input(e.target.value)}
//                         />

//                     <label htmlFor="goal_input">How much are you looking to save?</label>
//                     <input
//                         type="text" id="goal"
//                         placeholder="$30,000"
//                         value={goal_input}
//                         onChange={(e) => setGoal_input(e.target.value)}
//                         />

//                     <button onClick={submit} type="button">
//                         Submit
//                     </button>
//                 </div>
//                 )}

//         //display already created vaults i hope
//         <div className = "createdvaults">
//             {vaults.map((vault, index) => (
//                 <div key={index} className="vault">
//                     <h3>{vault.getTitle()}</h3>
//                     <p>Current Amount: ${vault.getAmount()}</p>
//                     <p>Goal: ${vault.getGoal()}</p>
//                     <div>
//                         <label htmlFor={`deposit-${index}`}>Make A Deposit:</label>
//                         <input
//                             type="text"
//                             id={`deposit-${index}`}
//                             placeholder="Enter deposit amount"
//                             value={additional_input[index] || ""}
//                             onChange={(e) => set_additional_input({...additional_input, [index]: e.target.value})}
//                         />
//                         <button onClick={() => deposit(index)}
//                         disabled={additional_input[index] === "" || isNaN(parseFloat(additional_input[index]))} //checks both if input for deposit amount is empty or if input entered is NOT a number
//                         >Finalize Deposit</button>
//                         <button
//                             onClick={() => withdraw(index)}
//                             disabled={vault.getAmount() < vault.getGoal()} //disables button if amount is less than goal
//                             >Withdraw All
//                         </button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     </div>
// );

// }

// export default CreateVault;

export default HomePage;
