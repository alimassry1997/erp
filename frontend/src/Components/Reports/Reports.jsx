import React, { useEffect, useState } from "react";
import "./Reports.css";
import {
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import LiveSearch from "../Layout/LiveSearch";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

const Reports = ({
  fetchEmployees,
  loadingEmployees,
  employees,
  getReport,
  loadingReport,
  reportEmployeeSkills,
  reportEmployee,
}) => {
  document.title = "Reports Dashboard | ERP";
  const { skills } = reportEmployee;
  const data = [
    { name: "Developer", score: 8 },
    { name: "Conflict", score: 5 },
    { name: "Collaboration", score: 3 },
    { name: "Communication", score: 7 },
  ];

  const progressSkills = [];
  for (let i = 0; i < reportEmployeeSkills.length; i++) {
    progressSkills.push({
      name: capitalizeFirstLetter(
        skills.find((skill) => skill.id === reportEmployeeSkills[i].skill_id)
          .name
      ),
      score: reportEmployeeSkills[i].score,
    });
  }

  const uniqueIds = [];
  const unique = progressSkills.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.name);
    if (!isDuplicate) {
      uniqueIds.push(element.name);
      return true;
    }
    return false;
  });

  console.log(unique);

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="reports">
      <h1>Reports</h1>
      {!loadingEmployees && (
        <LiveSearch employees={employees} getReport={getReport} />
      )}
      {loadingReport ? (
        <div className="no-data">Select an Employee to generate reports</div>
      ) : (
        <>
          <div className="reports-container"></div>
          <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
          {/*<div className="">*/}
          {/*  <div className="pro-name">Projects</div>*/}
          {/*  <div className="profiles-details">*/}
          {/*    <div className="container">*/}
          {/*      <div className="container__profile">*/}
          {/*        <img*/}
          {/*          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"*/}
          {/*          alt="people"*/}
          {/*        />*/}
          {/*        <div className="container__profile__text">*/}
          {/*          <h2>ERP project</h2>*/}
          {/*          <p>*/}
          {/*            Role: <b>Developer</b>*/}
          {/*          </p>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}

          {/*    <div className="container">*/}
          {/*      <div className="container__profile">*/}
          {/*        <img*/}
          {/*          src="https://image.shutterstock.com/mosaic_250/301519563/640011838/stock-photo-handsome-unshaven-young-dark-skinned-male-laughing-out-loud-at-funny-meme-he-found-on-internet-640011838.jpg"*/}
          {/*          alt="people"*/}
          {/*        />*/}
          {/*        <div className="container__profile__text">*/}
          {/*          <h2>E-commerce project</h2>*/}
          {/*          <p>*/}
          {/*            Role: <b>Copy writter</b>*/}
          {/*          </p>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}

          {/*<div className="container">*/}
          {/*  <div className="container__profile">*/}
          {/*    <img*/}
          {/*      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_lB0zHrt60hoQLrfN_6yRD38TDrxrhgsw1Q&usqp=CAU"*/}
          {/*      alt="people"*/}
          {/*    />*/}
          {/*    <div className="container__profile__text">*/}
          {/*      <h2>Weather project</h2>*/}
          {/*      <p>*/}
          {/*        Role: <b>Desinger</b>*/}
          {/*      </p>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="container">*/}
          {/*  <div className="container__profile">*/}
          {/*    <img*/}
          {/*      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5mEITjnY33bKQZIV3Ew6e0KSpWbSUNwcaYA&usqp=CAU"*/}
          {/*      alt="people"*/}
          {/*    />*/}
          {/*    <div className="container__profile__text">*/}
          {/*      <h2>Taxi project</h2>*/}
          {/*      <p>*/}
          {/*        Role: <b>UI/UX</b>*/}
          {/*      </p>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*    <div className="container">*/}
          {/*      <div className="container__profile">*/}
          {/*        <img*/}
          {/*          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjidvk3DPBtaN3SXhqTDVhzve_yJEhYIE9xQ&usqp=CAU"*/}
          {/*          alt="people"*/}
          {/*        />*/}
          {/*        <div className="container__profile__text">*/}
          {/*          <h2>Payroll project</h2>*/}
          {/*          <p>*/}
          {/*            Role: <b>Researching</b>*/}
          {/*          </p>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div className="container">*/}
          {/*      <div className="container__profile">*/}
          {/*        <img*/}
          {/*          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWWMlsAAxm58lIpwy0eD_SZIf6I9Qcr8qDVw&usqp=CAU"*/}
          {/*          alt="people"*/}
          {/*        />*/}
          {/*        <div className="container__profile__text">*/}
          {/*          <h2>Portfolio project</h2>*/}
          {/*          <p>*/}
          {/*            Role: <b>Implementing</b>*/}
          {/*          </p>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </>
      )}
    </div>
  );
};

export default Reports;
