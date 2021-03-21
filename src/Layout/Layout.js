import { withStyles } from '@material-ui/core/styles';
import './css/Layout.css';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import logo from './img/logo.svg';
import foot from './img/foot.svg';
import hand from './img/hand.svg';
import money from './img/money.svg';

import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';


const useStyles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
  },
  containerWrapper: {
      height: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 30,
      label: '30',
    },
    {
      value: 60,
      label: '60',
    },
    {
        value: 90,
        label: '90',
      },
    {
      value: 120,
      label: '120',
    },
  ];

  const vehicles = [
    {consumption: 8.7},
    {consumption: 10.3},
    {consumption: 12.9},
  ];

  function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }
  

class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stops: 0,
            consumption: 0,
            consumptionPerDistanceDiesel: 0,
            consumptionPerDistanceKwh: 0,
            emissions: 0,
            liter: 0.0,
            moneySavings: 0.0,
            dieselPrice: 1.2,
            kwhPrice: 0.36,
            kilometers: 0.0,
            co2: 27,
            reducedEmissions: 0.0,
            daysInMonth: 24
        };
    }

    onSliderChange = (event, newStops) => {
        this.setState({
            stops: newStops            
        })
        this.doCalculation();
    }

    onClickVehicle = (vehicleId) => {
        const _consumption = vehicles[vehicleId].consumption;
        console.log("_consumption", _consumption)
        this.setState({
            consumption: _consumption
        })
        setTimeout(() => {
            this.doCalculation();
        }, 500)
        
    }

    doCalculation(){
        let {consumption, stops, liter, moneySavings, kilometers, dieselPrice, kwhPrice, co2, consumptionPerDistanceDiesel, consumptionPerDistanceKwh, reducedEmissions, daysInMonth} = this.state;
        kilometers = stops / 2;
        consumptionPerDistanceDiesel = consumption / 100 * kilometers * daysInMonth;
        consumptionPerDistanceKwh = 4.6/100 * kilometers * daysInMonth;
        reducedEmissions = co2 * consumptionPerDistanceDiesel;
        const dieselTotal = consumptionPerDistanceDiesel * dieselPrice;
        const kwhTotal = consumptionPerDistanceKwh * 0.36;
        if( consumption > 0 ){
            moneySavings = dieselTotal - kwhTotal;
        }
        /*
        console.log("kilometers", kilometers);
        console.log("dieselTotal", dieselTotal);
        console.log("kwhTotal", kwhTotal);
        console.log("consumptionPerDistanceDiesel", consumptionPerDistanceDiesel);
        //console.log("consumptionPerDistanceKwh", consumptionPerDistanceKwh);
        */
        
        this.setState({            
            reducedEmissions: reducedEmissions,
            consumptionPerDistanceDiesel: consumptionPerDistanceDiesel,
            moneySavings: moneySavings
        })
    }

    render(){
        const { classes } = this.props;
        const {stops, reducedEmissions, consumptionPerDistanceDiesel, moneySavings} = this.state;

        return (
            <React.Fragment>
                <CssBaseline />
                <Container fixed>
                    <header >                    
                        <Grid container spacing={0}>
                            <Grid item xs={7}>
                                <img src={logo} className="App-logo" alt="logo" />
                            </Grid>
                            <Grid item xs={5}>
                                <Grid container spacing={0}>
                                    <Grid item xs={4}>
                                        <Link className="About" href="#">
                                            About
                                        </Link>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Link className="Services" href="#">
                                            Services
                                        </Link>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Link className="Contact" href="#">
                                            Contact
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Grid>        
                        </Grid>
                    </header>
                    <Grid container spacing={0} className="calculatorContainer">
                        <Grid item xs={7} className="calculatorLeft">                            
                            <Typography variant="h4" className="Test-your-savings-wi">
                                Test your savings with a cargo bike!
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom className="Your-amount-of-daily" >
                                Your amount of daily stops
                            </Typography>
                            <Grid container >
                                
                                    <Slider 
                                        value={stops} 
                                        onChange={this.onSliderChange} 
                                        className="Track" 
                                        valueLabelFormat={valueLabelFormat}
                                        aria-labelledby="continuous-slider"
                                        marks={marks}
                                        max={120} />
                                
                            </Grid>
                            <Grid container >
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" gutterBottom className="Your-current-vehicle" >
                                        Your current vehicle
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container >
                                <Grid item xs={12}>
                                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                                        <Button onClick={() => this.onClickVehicle(0)}>Sprinter</Button>
                                        <Button onClick={() => this.onClickVehicle(1)}>Crafter</Button>
                                        <Button onClick={() => this.onClickVehicle(2)}>Vito</Button>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={5} className="calculatorRight">                            
                            <img src={foot} />
                            <Typography variant="h4" gutterBottom className="impact" >
                                {reducedEmissions.toFixed(2)} g
                            </Typography>
                            <Typography variant="h4" gutterBottom className="CO2" >
                                CO2
                            </Typography>
                            <Grid container >
                                <Grid item xs={6}>
                                    <img src={hand} />
                                    <Typography variant="h4" gutterBottom className="litEur" >
                                        {consumptionPerDistanceDiesel.toFixed(2)} l
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <img src={money} />
                                    <Typography variant="h4" gutterBottom className="litEur" >
                                        {moneySavings.toFixed(2)} €
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} className="Why-should-you">
                            [3001]Why should you use a cargo bike?
                        </Grid>
                        <Grid item xs={12} className="Quae-fuerit-ca">
                            [3002]Quae fuerit causa, mox videro; interea hoc tenebo, si mihi probabis ea, quae sine metu degendae praesidia firmissima filium morte multavit si sine metu degendae praesidia firmissima filium morte multavit si sine metu contineret, saluti prospexit civium, qua intellegebat contineri suam atque admonitionem altera occulta.
                        </Grid>
                    </Grid>
                    <Grid container className="ProfitContainer">
                        <Grid item xs={4}>
                            <Typography variant="h4" gutterBottom className="Profit" >
                                Test
                            </Typography>
                            <div>
                            [3008]Quae fuerit causa, mox videro; interea hoc tenebo, si mihi probabis ea, quae sine metu degendae praesidia
                            </div>
                        </Grid>
                        <Grid item xs={4} >
                            <Typography variant="h4" gutterBottom className="Profit" >
                                Test
                            </Typography>
                            <div>
                            [3008]Quae fuerit causa, mox videro; interea hoc tenebo, si mihi probabis ea, quae sine metu degendae praesidia
                            </div>
                        </Grid>
                        <Grid item xs={4} >
                            <Typography variant="h4" gutterBottom className="Profit" >
                                Test
                            </Typography>
                            <div>
                            [3008]Quae fuerit causa, mox videro; interea hoc tenebo, si mihi probabis ea, quae sine metu degendae praesidia
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container className="Footer">
                        <Grid item xs={4} >
                            <img src={logo} className="bikeswitchLogo2" alt="logo" />
                        </Grid>
                        <Grid item xs={8} className="Company" >
                            Company<br />
                            Street <br />
                            ZipCode + City
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
            /*
            <div className={classes.root}>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                >
                Learn React
                </a>
            </header>
                <Grid className={classes.containerWrapper} container spacing={1}>        
                    Hello World
                </Grid>    
            </div>
            */
        );
    }
}

export default withStyles(useStyles)(Layout)

