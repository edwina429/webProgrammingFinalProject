import React from "react";
import "./webpage.css";

function Vault({navigate}){
  return(
      <div>
        <button onClick={() => navigate('vault')} > {/*include style here*/}
          Go to Vault Page
        </button>
      </div>
  );
}


function HomePage() {
  return (
    <div>
      {/* Header Section */}
      <div className="header">
        <div className="college-logo">
          <h1>College Tracker</h1>
        </div>
      </div>

      {/* Main Menu */}
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

      {/* Button Section */}
      <div className="button-section">
        <div className="button-container">
          <button className="New-Goal" id="new-goal-btn">
            New Goal
          </button>
          <button className="Delete-Goal" id="delete-goal-btn">
            Delete
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="content">
        <div className="Goal-Chart">
          <canvas id="goalChart"></canvas>
        </div>
      </div>

      {/* Goal Input Section */}
      <div className="goal-input" id="goal-input-section" style={{ display: "none" }}>
        <input type="text" id="goal-name" placeholder="Enter Goal Name" />
        <input type="number" id="goal-value" placeholder="Enter Goal Value" />
        <button id="add-goal">Add Goal</button>
      </div>

      {/* Calendar Section */}
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

      {/* Goal List Section */}
      <div className="goal-list" id="goal-list">
        <h3>Your Goals</h3>
        <ul id="goals"></ul>
        <div id="charts-container"></div>
      </div>
    </div>
  );
}

export default HomePage;
