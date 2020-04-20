import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [ip, setIp] = useState("10.10.10.10");
    const [iplist1, setIplist1] = useState(["172.16.15.64", "26"]);
    const [iplist2, setIplist2] = useState(["172.16.15.128", "25"]);
    const [iplist3, setIplist3] = useState(["10.10.10.0", "23"]);
    const [iplist4, setIplist4] = useState(["1.2.3.4", "32"]);
    const [ip1, setIp1] = useState("172.16.15.64");
    const [mask1, setMask1] = useState("26");
    const [ip2, setIp2] = useState("172.16.15.128");
    const [mask2, setMask2] = useState("25");
    const [ip3, setIp3] = useState("10.10.10.0");
    const [mask3, setMask3] = useState("23");
    const [ip4, setIp4] = useState("1.2.3.4");
    const [mask4, setMask4] = useState("32");
    const [queryResult, setQueryResult] = useState("");


    function ValidateFullIPaddress(ipaddress) {
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
            return (true);
        } else {
            return (false);
        }
    }


    function ValidateIPaddress(ipaddress) {
        let ipArray = new Array;
        ipArray = ipaddress.split(".");
        if ((ipArray[0] > 255) || (ipArray[1] > 255) || (ipArray[2] > 255) || (ipArray[3] > 255)){
            return(false);
        } else {
            return(true);
        }
    }

    function handleOnChange(event) {
        let ipTesting = event.target.value;
        if (ValidateIPaddress(ipTesting)) { setIp(event.target.value); }
    };

    function ValidateNetworkAddress(netaddress, mask) {
        let num = new Array;
        let numDec = 0;
        let rest = 32 - mask;
        let can = true;
        num = netaddress.split(".");
        numDec = num[0]*256*256*256 + num[1]*256*256 + num[2]*256 + num[3]*1;

        for (let i = 1; i <= rest; i++) {
            if ((numDec % 2) == 1) { can = false; }
            numDec /= 2;
        }

        return can;
    }

    function handle1OnClick(event) {
        let iplistUpdate = new Array;
        iplistUpdate[0] = ip1;
        iplistUpdate[1] = mask1;
        
        if (ValidateNetworkAddress(iplistUpdate[0], iplistUpdate[1])) {
            setIplist1(iplistUpdate);
        } else {
            alert("Impossible network address " + iplistUpdate[0] + " with subnet mask " + iplistUpdate[1]);
        }
    };

    function handleIP1OnChange(event) {
        let ipTesting = event.target.value;
        if (ValidateIPaddress(ipTesting)) { setIp1(event.target.value); }
    };

    function handleMask1OnChange(event) {
        let maskTesting = event.target.value;
        if ((maskTesting >= 0) && (maskTesting <= 32)) { setMask1(event.target.value); }
    };

    function handle2OnClick(event) {
        let iplistUpdate = new Array;
        iplistUpdate[0] = ip2;
        iplistUpdate[1] = mask2;
        
        if (ValidateNetworkAddress(iplistUpdate[0], iplistUpdate[1])) {
            setIplist2(iplistUpdate);
        } else {
            alert("Impossible network address " + iplistUpdate[0] + " with subnet mask " + iplistUpdate[1]);
        }
    };

    function handleIP2OnChange(event) {
        let ipTesting = event.target.value;
        if (ValidateIPaddress(ipTesting)) { setIp2(event.target.value); }
    };

    function handleMask2OnChange(event) {
        let maskTesting = event.target.value;
        if ((maskTesting >= 0) && (maskTesting <= 32)) { setMask2(event.target.value); }
    };

    function handle3OnClick(event) {
        let iplistUpdate = new Array;
        iplistUpdate[0] = ip3;
        iplistUpdate[1] = mask3;
        
        if (ValidateNetworkAddress(iplistUpdate[0], iplistUpdate[1])) {
            setIplist3(iplistUpdate);
        } else {
            alert("Impossible network address " + iplistUpdate[0] + " with subnet mask " + iplistUpdate[1]);
        }
    };

    function handleIP3OnChange(event) {
        let ipTesting = event.target.value;
        if (ValidateIPaddress(ipTesting)) { setIp3(event.target.value); }
    };

    function handleMask3OnChange(event) {
        let maskTesting = event.target.value;
        if ((maskTesting >= 0) && (maskTesting <= 32)) { setMask3(event.target.value); }
    };

    function handle4OnClick(event) {
        let iplistUpdate = new Array;
        iplistUpdate[0] = ip4;
        iplistUpdate[1] = mask4;
        
        if (ValidateNetworkAddress(iplistUpdate[0], iplistUpdate[1])) {
            setIplist4(iplistUpdate);
        } else {
            alert("Impossible network address " + iplistUpdate[0] + " with subnet mask " + iplistUpdate[1]);
        }
    };

    function handleIP4OnChange(event) {
        let ipTesting = event.target.value;
        if (ValidateIPaddress(ipTesting)) { setIp4(event.target.value); }
    };

    function handleMask4OnChange(event) {
        let maskTesting = event.target.value;
        if ((maskTesting >= 0) && (maskTesting <= 32)) { setMask4(event.target.value); }
    };

    useEffect(() => {
        let ipTyping = ip;
        let ip1234 = new Array;
        let ipDec = 0;
        let iplist1x1234 = new Array;
        let iplist2x1234 = new Array;
        let iplist3x1234 = new Array;
        let iplist4x1234 = new Array;
        let iplist1DecMin = 0;
        let iplist2DecMin = 0;
        let iplist3DecMin = 0;
        let iplist4DecMin = 0;
        let iplist1DecMax = 0;
        let iplist2DecMax = 0;
        let iplist3DecMax = 0;
        let iplist4DecMax = 0;

        ip1234 = ipTyping.split(".");

        if (ip1234[3]) {
            ipDec = ip1234[0]*256*256*256 + ip1234[1]*256*256 + ip1234[2]*256 + ip1234[3]*1;
        }
        
        iplist1x1234 = iplist1[0].split(".");
        iplist1DecMin = iplist1x1234[0]*256*256*256 + iplist1x1234[1]*256*256 + iplist1x1234[2]*256 + iplist1x1234[3]*1;
        iplist1DecMax = iplist1DecMin + Math.pow(2, 32-iplist1[1])-1;

        iplist2x1234 = iplist2[0].split(".");
        iplist2DecMin = iplist2x1234[0]*256*256*256 + iplist2x1234[1]*256*256 + iplist2x1234[2]*256 + iplist2x1234[3]*1;
        iplist2DecMax = iplist2DecMin + Math.pow(2, 32-iplist2[1])-1;

        iplist3x1234 = iplist3[0].split(".");
        iplist3DecMin = iplist3x1234[0]*256*256*256 + iplist3x1234[1]*256*256 + iplist3x1234[2]*256 + iplist3x1234[3]*1;
        iplist3DecMax = iplist3DecMin + Math.pow(2, 32-iplist3[1])-1;

        iplist4x1234 = iplist4[0].split(".");
        iplist4DecMin = iplist4x1234[0]*256*256*256 + iplist4x1234[1]*256*256 + iplist4x1234[2]*256 + iplist4x1234[3]*1;
        iplist4DecMax = iplist4DecMin + Math.pow(2, 32-iplist4[1])-1;

        let found = 0;
        let queryMessage = "Seaching " + ip + "...";
        if ((ipDec >= iplist1DecMin) && (ipDec <= iplist1DecMax)) { 
            if (found >= 1) { queryMessage += ", " } else { queryMessage += "found in " };
            queryMessage += "list1";
            found++;
        };
        if ((ipDec >= iplist2DecMin) && (ipDec <= iplist2DecMax)) {
            if (found >= 1) { queryMessage += ", " } else { queryMessage += "found in " };
            queryMessage += "list2";
            found++;
        };
        if ((ipDec >= iplist3DecMin) && (ipDec <= iplist3DecMax)) {
            if (found >= 1) { queryMessage += ", " } else { queryMessage += "found in " };
            queryMessage += "list3";
            found++;
        };
        if ((ipDec >= iplist4DecMin) && (ipDec <= iplist4DecMax)) {
            if (found >= 1) { queryMessage += ", " } else { queryMessage += "found in " };
            queryMessage += "list4";
            found++;
        };

        if (found == 0) { queryMessage += "not found" }

        if ((ipTyping == "") || !(ValidateFullIPaddress(ipTyping))) { queryMessage = ""; }

        setQueryResult(queryMessage)
    });

    return (
      <div className="App">
        <header className="App-header">
          <div>IP Address:</div><input value={ip} onChange={handleOnChange} />
          <div style={{fontSize:14}}>{queryResult}</div>
        </header>
        <article className="App-article">
          <div></div>
          <table border="1" cellPadding="2" cellSpacing="3">
              <tr>
                  <td width="25%"><b>IP List Name</b></td>
                  <td width="25%"><b>IP Address</b></td>
                  <td width="25%"><b>Mask</b></td>
                  <td width="25%"><b>Need to change?</b></td>
              </tr>
              <tr>
                  <td>list1</td>
                  <td>{iplist1[0]}</td>
                  <td>{iplist1[1]}</td>
                  <td><input value={ip1} size="15" onChange={handleIP1OnChange} />/<input value={mask1} size="2" onChange={handleMask1OnChange} /><button onClick={handle1OnClick}>update</button></td>
              </tr>
              <tr>
                  <td>list2</td>
                  <td>{iplist2[0]}</td>
                  <td>{iplist2[1]}</td>
                  <td><input value={ip2} size="15" onChange={handleIP2OnChange} />/<input value={mask2} size="2" onChange={handleMask2OnChange} /><button onClick={handle2OnClick}>update</button></td>
              </tr>
              <tr>
                  <td>list3</td>
                  <td>{iplist3[0]}</td>
                  <td>{iplist3[1]}</td>
                  <td><input value={ip3} size="15" onChange={handleIP3OnChange} />/<input value={mask3} size="2" onChange={handleMask3OnChange} /><button onClick={handle3OnClick}>update</button></td>
              </tr>
              <tr>
                  <td>list4</td>
                  <td>{iplist4[0]}</td>
                  <td>{iplist4[1]}</td>
                  <td><input value={ip4} size="15" onChange={handleIP4OnChange} />/<input value={mask4} size="2" onChange={handleMask4OnChange} /><button onClick={handle4OnClick}>update</button></td>
              </tr>
          </table>
        </article>
        <footer className="App-footer">
          <div>Script by Mongkol Thamwongskul. Powered by React.</div>
        </footer>
      </div>
    )
};

export default App;
