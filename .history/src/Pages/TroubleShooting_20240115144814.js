
import React from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';
import SideBar from './Components/SideBar'
import { Box } from '@mui/material'
const Chart = (props) => {

        return (
          <div style={{ display: "grid", gridTemplateColumns: "250px 1fr" }}>
          <Box sx={{display: "flex"}}>
          <SideBar/>
            <XYPlot
                width={300}
                height={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <LineSeries
                    data={[
                        {x: 1, y: 4},
                        {x: 5, y: 2},
                        {x: 15, y: 6}
                    ]}/>
            </XYPlot>
          </Box>
          </div>
        );
}
export default Chart;