import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const BudgetVisualizer = ({
    budget,
    spent,
    percentageRemaining
}) => {
    //  (percentageRemaining >= 0 && percentageRemaining <= 20) ? 'error' :
    // (percentageRemaining > 20 && percentageRemaining <= 50) ? 'warn' :
    // (percentageRemaining > 50 && percentageRemaining <= 80) ? 'info' :
    // (percentageRemaining > 80 && percentageRemaining <= 100) ? 'success' : 'error'
    return (
        // Circle visualizer progress bar
        <div className='w-full flex gap-5 justify-center items-center py-2'>
            <div className="w-1/2 h-fit flex flex-col gap-2 text-layout-600" >
                <div className='w-full h-fit flex flex-col justify-center p-2 rounded border gap-1'>
                    <span className='text-sm'>
                        Spent
                    </span>
                    <span className='text-xl font-semibold'>
                        ₹{spent}
                    </span>
                </div>
                <div className='w-full h-fit flex flex-col justify-center p-2 rounded border gap-1'>
                    <span className='text-sm'>
                        Budget
                    </span>
                    <span className='text-xl font-semibold'>
                        ₹{budget}
                    </span>
                </div>

            </div>
            <div className="w-1/2 ">
                <CircularProgressbar
                    value={spent}
                    maxValue={budget}
                    text={`${((spent / budget) * 100).toFixed(1)}%`}
                    styles={buildStyles({
                        // rotation 90deg
                        rotation: 0.50,
                        // Text size
                        textSize: '10px',
                        // Colors
                        pathColor: (percentageRemaining >= 0 && percentageRemaining <= 20) ? 'hsla(0, 90%, 40%, 1)' :
                            (percentageRemaining > 20 && percentageRemaining <= 50) ? 'hsla(40, 90%, 50%, 1)' :
                                (percentageRemaining > 50 && percentageRemaining <= 80) ? 'hsla(210, 50%, 50%, 1)' :
                                    (percentageRemaining > 80 && percentageRemaining <= 100) ? 'hsla(125, 90%, 40%, 1)' : 'hsla(0, 90%, 40%, 1)',
                        textColor: (percentageRemaining >= 0 && percentageRemaining <= 20) ? 'hsla(0, 90%, 40%, 1)' :
                            (percentageRemaining > 20 && percentageRemaining <= 50) ? 'hsla(40, 90%, 50%, 1)' :
                                (percentageRemaining > 50 && percentageRemaining <= 80) ? 'hsla(210, 50%, 50%, 1)' :
                                    (percentageRemaining > 80 && percentageRemaining <= 100) ? 'hsla(125, 90%, 40%, 1)' : 'hsla(0, 90%, 40%, 1)',
                        trailColor: 'hsla(0, 0%, 90%, 1)',
                    })}
                />
            </div>
        </div>
    )
}

export default BudgetVisualizer