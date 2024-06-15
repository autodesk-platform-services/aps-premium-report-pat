﻿/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by APS Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////
document.getElementsByTagName("head")[0].innerHTML +=
  '<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>';
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
let a;
let getusagebtn;
let context_id = "";
let specific_id = "";
let specific_id1 = "";
let specific_id2 = "";
let specific_export = "";
let token = "";
let premiumApi = {
  access_token: "",
  LogIn: ["Log In", "Logged In"],
  onLoad: async function () {
    this.logIn().then(() => {
      access_token = token;
      console.log("token is " + access_token);
      document.getElementById("GetUsageInformation").disabled = true;
      document.getElementById("GetUsageInformation").textContent = "Loading";
      console.log(access_token);
      setTimeout(() => {
        if (access_token === "") return console.log("NO ACCESS TOKEN PROVIDED");
        fetch("https://developer.api.autodesk.com/insights/v1/contexts", {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
            "ADSK-PAT": "",
          },
        })
          .then((res) => res.text())
          .then((data) => {
            let json1 = JSON.parse(data);
            context_id = (json1[0] || "").contextId;
            console.log("context id is" + context_id);
            let user_specific = {
              fields: ["fullName", "productName"],
              metrics: [
                "earliestUsageDate",
                "latestUsageDate",
                "totalUniqueDays",
              ],
              where: "",
              orderBy: "",
              context: context_id,
            };
            setTimeout(() => {
              if (access_token === "") return;
              fetch(
                "https://developer.api.autodesk.com/insights/v1/usage-queries?offset=0&limit=100&" +
                  context_id,
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                    "ADSK-PAT": "",
                  },
                  body: JSON.stringify(user_specific),
                }
              )
                .then((res) => res.text())
                .then((data) => {
                  let json2 = JSON.parse(data);
                  console.log(json2);
                  specific_id = json2.id;
                  console.log("specific id is" + specific_id);
                  let user_specific1 = {
                    fields: ["fullName", "productName", "childProductName"],
                    metrics: [],
                    where: "",
                    orderBy: "",
                  };
                  setTimeout(() => {
                    if (access_token === "") return;
                    fetch(
                      "https://developer.api.autodesk.com/insights/v1/usage-queries?offset=0&limit=100&" +
                        context_id,
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${access_token}`,
                          "Content-Type": "application/json",
                          "ADSK-PAT": "",
                          "Access-Control-Allow-Headers": "adsk-pat",
                        },
                        body: JSON.stringify(user_specific1),
                      }
                    )
                      .then((res) => res.text())
                      .then((data) => {
                        let json2 = JSON.parse(data);
                        console.log(json2);
                        specific_id1 = json2.id;
                        console.log("specific id is" + specific_id1);
                        let user_specific2 = {
                          fields: ["fullName", "productName"],
                          metrics: ["totalUniqueDays", "uniqueProducts"],
                          where: "",
                          orderBy: "",
                        };
                        setTimeout(() => {
                          if (access_token === "") return;
                          fetch(
                            "https://developer.api.autodesk.com/insights/v1/usage-queries?offset=0&limit=100&" +
                              context_id,
                            {
                              method: "POST",
                              headers: {
                                Authorization: `Bearer ${access_token}`,
                                "Content-Type": "application/json",
                                "ADSK-PAT": "",
                              },
                              body: JSON.stringify(user_specific2),
                            }
                          )
                            .then((res) => res.text())
                            .then((data) => {
                              let json2 = JSON.parse(data);
                              console.log(json2);
                              specific_id2 = json2.id;
                              console.log("specific id is" + specific_id2);

                              setTimeout(() => {
                                let user_export = {
                                  outputFormat: "EXCEL",
                                  reports: ["SUBSCRIPTIONS"],
                                };
                                if (access_token === "") return;
                                fetch(
                                  "https://developer.api.autodesk.com/insights/v1/exports",
                                  {
                                    method: "POST",
                                    headers: {
                                      Authorization: `Bearer ${access_token}`,
                                      "Content-Type": "application/json",
                                      "ADSK-PAT": "",
                                    },
                                    body: JSON.stringify(user_export),
                                  }
                                )
                                  .then((res) => res.text())
                                  .then((data) => {
                                    let json2 = JSON.parse(data);
                                    console.log(json2);
                                    specific_export = json2.id;
                                    console.log(
                                      "specific export is" + specific_export
                                    );

                                    document.getElementById(
                                      "GetUsageInformation"
                                    ).disabled = false;
                                    document.getElementById(
                                      "GetUsageInformation"
                                    ).textContent =
                                      "Custom Usage Query API Data";
                                  });
                              }, 1000);
                            });
                        }, 1000);
                      });
                  }, 1000);
                });
            }, 1000);
          });
      }, 1000);
    });
  },
  getusage: async function () {
    setTimeout(() => {
      console.log("Waited 5s");
      if (access_token === "") return;
      fetch(
        "https://developer.api.autodesk.com/insights/v1/usage-queries/" +
          specific_id,
        {
          headers: {
            "Content-Type": "application/json",
            "ADSK-PAT": "",
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
        .then((res) => res.text())
        .then((data) => {
          document.getElementById("GetUsageInformation").disabled = true;
          document.getElementById("GetUsageInformation").textContent =
            "Loading";
          let json2 = JSON.parse(data);
          const result = (json2.columns || []).length;
          if (result > 0) {
            var temp1 = "";
            temp1 += "<tr>";
            temp1 += "<th>" + "Full Name" + "</th></a>";
            temp1 += "<th>" + "Product Name" + "</th>";
            temp1 += "<th>" + "Earliest Usage Date" + "</th>";
            temp1 += "<th>" + "Latest Usage Date" + "</th>";
            temp1 += "<th>" + "Total Unique Days" + "</th>";
            temp1 +=
              "<th>" + "Potential Flex Candidate(7 days or less)" + "</th>";
            temp1 += "<th>" + "Active Users(60 days)" + "</th></tr>";
            document.getElementById("activeh").innerHTML = temp1;
          }
          var x = 0;
          var temp = "";
          const r1 = (json2.rows || []).length;
          if (r1 > 0) {
            var y = 0;
            json2.rows.forEach((u) => {
              let value;
              var currenttime = new Date();
              var expiretime = new Date(json2.rows[x][y + 3]);
              var msec = Math.abs(currenttime - expiretime);
              var min = Math.floor(msec / 1000 / 60);
              var hours = min / 60;
              var max_hours = 1440;
              if (hours < max_hours) {
                value = "Active";
              } else {
                value = "Inactive";
              }
              let potential_flex;
              //check unique day is greater than or equal to 7
              if (json2.rows[x][y + 4] >= 7) {
                potential_flex = "No";
              } else {
                potential_flex = "Yes";
              }
              var earliest_ud = new Date(json2.rows[x][y + 2]);
              var latest_ud = new Date(json2.rows[x][y + 3]);
              if (value == "Active") {
                temp += "<tr>";
                temp += "<td>" + json2.rows[x][y] + "</td>";
                temp += "<td>" + json2.rows[x][y + 1] + "</td></a>";
                temp += "<td>" + earliest_ud.toDateString() + "</td>";
                temp += "<td>" + latest_ud.toDateString() + "</td>";
                temp += "<td>" + json2.rows[x][y + 4] + "</td>";
                temp += "<td>" + potential_flex + "</td>";
                temp += "<td>" + value + "</td></tr>";
              }
              x = x + 1;
            });
          }
          document.getElementById("active").innerHTML = temp;
          if (result > 0) {
            var temp1 = "";
            temp1 += "<tr>";
            temp1 += "<th>" + "Full Name" + "</th>";
            temp1 += "<th>" + "Product Name" + "</th></a>";
            temp1 += "<th>" + "Earliest Usage Date" + "</th>";
            temp1 += "<th>" + "Latest Usage Date " + "</th>";
            temp1 += "<th>" + "Total Unique Days" + "</th>";
            temp1 +=
              "<th>" + "Potential Flex Candidate(7 days or less)" + "</th>";
            temp1 += "<th>" + "Inactive Users(60 days)" + "</th></tr>";
            document.getElementById("inactiveh").innerHTML = temp1;
          }
          var x = 0;
          var temp = "";
          if (r1 > 0) {
            var y = 0;
            json2.rows.forEach((u) => {
              let value;
              var currenttime = new Date();
              var expiretime = new Date(json2.rows[x][y + 3]);
              var msec = Math.abs(currenttime - expiretime);
              var min = Math.floor(msec / 1000 / 60);
              var hours = min / 60;
              var max_hours = 1440;
              if (hours < max_hours) {
                value = "Active";
              } else {
                value = "Inactive";
              }
              let potential_flex;
              //check unique day is greater than or equal to 7
              if (json2.rows[x][y + 4] >= 7) {
                potential_flex = "No";
              } else {
                potential_flex = "Yes";
              }
              var earliest_ud = new Date(json2.rows[x][y + 2]);
              var latest_ud = new Date(json2.rows[x][y + 3]);
              if (value == "Inactive") {
                temp += "<tr>";
                temp += "<td>" + json2.rows[x][y] + "</td>";
                temp += "<td>" + json2.rows[x][y + 1] + "</td></a>";
                temp += "<td>" + earliest_ud.toDateString() + "</td>";
                temp += "<td>" + latest_ud.toDateString() + "</td>";
                temp += "<td>" + json2.rows[x][y + 4] + "</td>";
                temp += "<td>" + potential_flex + "</td>";
                temp += "<td>" + value + "</td></tr>";
              }
              x = x + 1;
            });
          }
          document.getElementById("inactive").innerHTML = temp;
          setTimeout(() => {
            if (access_token === "") return;
            fetch(
              "https://developer.api.autodesk.com/insights/v1/usage-queries/" +
                specific_id1,
              {
                headers: {
                  "Content-Type": "application/json",
                  "ADSK-PAT": "",
                  Authorization: `Bearer ${access_token}`,
                },
              }
            )
              .then((res) => res.text())
              .then((data) => {
                let json4 = JSON.parse(data);
                const result4 = (json4.columns || []).length;
                if (result4 > 0) {
                  var temp3 = "";
                  temp3 += "<tr>";
                  temp3 +=
                    "<th>" +
                    "Users who can be moved to a collection" +
                    "</th></a>";
                  temp3 += "<th>" + "Product Name" + "</th>";
                  temp3 += "<th>" + "Child Product Name" + "</th></tr>";
                  document.getElementById("getData402").innerHTML = temp3;
                }
                var x = 0;
                var temp5 = "";
                const r4 = (json4.rows || []).length;
                if (r4 > 0) {
                  var y = 0;
                  var z = 0;
                  json4.rows.forEach((u) => {
                    if (json4.rows[x][y + 1] == json4.rows[x][y + 2]) {
                      temp5 += "<tr>";
                      temp5 += "<td>" + json4.rows[x][y] + "</td></a>";
                      temp5 += "<td>" + json4.rows[x][y + 1] + "</td>";
                      temp5 += "<td>" + json4.rows[x][y + 2] + "</td></tr>";
                    }
                    x = x + 1;
                  });
                }
                document.getElementById("getData403").innerHTML = temp5;
                setTimeout(() => {
                  if (access_token === "") return;
                  fetch(
                    "https://developer.api.autodesk.com/insights/v1/usage-queries/" +
                      specific_id2,
                    {
                      headers: {
                        "Content-Type": "application/json",
                        "ADSK-PAT": "",
                        Authorization: `Bearer ${access_token}`,
                      },
                    }
                  )
                    .then((res) => res.text())
                    .then((data) => {
                      let json5 = JSON.parse(data);
                      const result5 = (json5.columns || []).length;
                      if (result5 > 0) {
                        var temp3 = "";
                        temp3 += "<tr>";
                        temp3 +=
                          "<th>" +
                          "Users who are only utilizing one product from a collection." +
                          "</th></a>";
                        temp3 += "<th>" + "Child Product Name" + "</th>";
                        temp3 += "<th>" + "Total Unique Days" + "</th>";
                        temp3 += "<th>" + "Unique Products" + "</th></tr>";
                        document.getElementById("get208").innerHTML = temp3;
                      }
                      var x = 0;
                      var temp5 = "";
                      const r5 = (json5.rows || []).length;
                      if (r5 > 0) {
                        var y = 0;
                        var z = 0;
                        json5.rows.forEach((u) => {
                          if (json5.rows[x][y + 2] <= 5) {
                            if (json5.rows[x][y + 3] == 1) {
                              temp5 += "<tr>";
                              temp5 += "<td>" + json5.rows[x][y] + "</td></a>";
                              temp5 += "<td>" + json5.rows[x][y + 1] + "</td>";
                              temp5 += "<td>" + json5.rows[x][y + 2] + "</td>";
                              temp5 +=
                                "<td>" + json5.rows[x][y + 3] + "</td></tr>";
                            }
                          }
                          x = x + 1;
                        });
                      }
                      document.getElementById("get209").innerHTML = temp5;
                      setTimeout(() => {
                        document.getElementById(
                          "GetUsageInformation"
                        ).disabled = false;
                      }, 5000);
                      document.getElementById(
                        "GetUsageInformation"
                      ).textContent = "Custom Usage Query API Data";
                    });
                }, 1000);
              });
          }, 1000);
        });
    }, 1000);
  },
  viewallexport: async function () {
    document.getElementById("viewAllExport").disabled = true;
    document.getElementById("viewAllExport").textContent = "Loading";
    if (access_token === "") return;
    fetch(
      "https://developer.api.autodesk.com/insights/v1/exports/" +
        specific_export,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "ADSK-PAT": "",
        },
        outputFormat: "EXCEL",
        reports: ["USAGE", "USERS", "SUBSCRIPTIONS"],
      }
    )
      .then((res) => res.text())
      .then((data) => {
        let json = JSON.parse(data);
        console.log(json);

        document.getElementById("d").innerHTML = json.downloads[0].downloadURL;
        //download this file in order to save it in share point location which can be used in PowerBI integration
        var dlAnchorElem = document.getElementById("downloadAnchorElem");
        dlAnchorElem.setAttribute("href", json.downloads[0].downloadURL);
        dlAnchorElem.setAttribute("download", "scene.xlsx");
        dlAnchorElem.click();
        if (json.exports.length > 0) {
          var temp1 = "";
          json.exports.forEach((u) => {
            temp1 += "<tr>";
            temp1 += "<th>" + "Usage Id" + "</th>";
            temp1 += "<th>" + "Usage TimeStamp" + "</th>";
            temp1 += "<th>" + "Download URL" + "</th></a>";
            temp1 += "<th>" + "Status" + "</th>";
            temp1 += "<th>" + "Output Format" + "</th></tr>";
          });
          console.log(temp1);
          document.getElementById("data7").innerHTML = temp1;
        }
        if (json.exports.length > 0) {
          var temp = "";
          json.exports.forEach((u) => {
            temp += "<tr>";
            temp += "<td>" + u.id + "</td>";
            temp += "<td>" + u.timestamp + "</td>";
            temp += "<td>" + u.downloads[0].downloadURL + "</td></a>";
            temp += "<td>" + u.status + "</td>";
            temp += "<td>" + u.outputFormal + "</td></tr>";
          });
          console.log(temp);
          document.getElementById("data8").innerHTML = temp;
        }
      });
    setTimeout(() => {
      document.getElementById("viewAllExport").disabled = false;
    }, 5000);
    document.getElementById("viewAllExport").textContent =
      "Download Export Usage Query API Data";
  },

  showInfo: function (text) {
    let logInButton = document.getElementById("Info");
    logInButton.value = text;
  },
  logIn: function () {
    console.log("logIn");
    const clientId = "";
    const clientSecret = "";
    const credentials = btoa(`${clientId}:${clientSecret}`);
    const scopes = "data:read";

    // Return the fetch promise
    return fetch("https://developer.api.autodesk.com/authentication/v2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Authorization: `Basic ${credentials}`,
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope: scopes,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        token = data.access_token;
      })
      .catch((error) => console.error("Error:", error));
  },
};
