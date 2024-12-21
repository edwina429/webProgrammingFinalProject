import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';


function Vault({navigate}){
  return(
      <div>
        <button onClick={() => navigate('vault')} >
          Go to Goals Page
        </button>
      </div>
  );
}


function App() {
  const [goals, setGoals] = useState([]);

  const handleNewGoal = () => {
    const goalName = prompt("What's the goal?");
    if (!goalName) return;

    const totalCost = parseFloat(prompt("What's the total cost?"));
    if (isNaN(totalCost) || totalCost <= 0) {
      alert("Please enter a valid total cost.");
      return;
    }

    const amountPaid = parseFloat(prompt("How much have you paid so far?"));
    if (isNaN(amountPaid) || amountPaid < 0 || amountPaid > totalCost) {
      alert("Please enter a valid amount paid (less than or equal to the total cost).\");
      return;
    }

    const newGoal = { goalName, totalCost, amountPaid };
    setGoals([...goals, newGoal]);
  };

  return (
    <div>
      <Header />
      <ButtonSection onNewGoal={handleNewGoal} />
      <GoalChart goals={goals} />
      <Calendar />
      <GoalList goals={goals} />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <div className="college-logo">
        <h1>College Tracker</h1>
      </div>
      <div className="main-menu">
        <button className="Account-button">Account</button>
        <button className="Profile-button">Profile</button>
      </div>
    </div>
  );
}

function ButtonSection({ onNewGoal }) {
  return (
    <div className="button-section">
      <div className="button-container">
        <button className="New-Goal" onClick={onNewGoal}>New Goal</button>
        <button className="Delete-Goal">Delete</button>
      </div>
    </div>
  );
}

function GoalChart({ goals }) {
  return (
    <div className="content">
      {goals.map((goal, index) => (
        <ChartComponent key={index} goal={goal} />
      ))}
    </div>
  );
}

function ChartComponent({ goal }) {
  const chartRef = React.useRef(null);

  React.useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [goal.goalName],
        datasets: [
          {
            label: 'Amount Paid',
            data: [goal.amountPaid],
            backgroundColor: '#28a745',
          },
          {
            label: 'Amount Remaining',
            data: [goal.totalCost - goal.amountPaid],
            backgroundColor: '#ffc107',
          },
        ],
      },
      options: {
        responsive: true,
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
  }, [goal]);

  return <canvas ref={chartRef} width={600} height={200}></canvas>;
}

function Calendar() {
  return (
    <div className="calendar-container">
      <div className="calendar">
        <h3>Calendar</h3>
        <table>
          <thead>
            <tr>
              <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
            </tr>
          </thead>
          <tbody>
            <tr><td></td><td></td><td></td><td>1</td><td>2</td><td>3</td><td>4</td></tr>
            <tr><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td></tr>
            <tr><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td></tr>
            <tr><td>19</td><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td></tr>
            <tr><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td><td>31</td><td></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GoalList({ goals }) {
  return (
    <div className="goal-list">
      <h3>Your Goals</h3>
      <ul>
        {goals.map((goal, index) => (
          <li key={index}>
            Goal: {goal.goalName} | Total Cost: ${goal.totalCost} | Paid: ${goal.amountPaid}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
