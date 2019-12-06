import React, { useState } from 'react';

import { TextDetail } from "../presentational/Global";
import { Overlay, SubContent, Content } from "../presentational/Wrapper";
import { GreenLink, Close } from "../presentational/Button";
import Input, { Dropdown, DropdownItems, DropdownItem, FullInput, BraintreeForm } from '../presentational/Input';

import DonateForm from "../DonateForm";

const StaticDonate = (props) => { 
    const projects = props.projects;
    const [project, setProject] = useState(0);
    const [projectDropdown, setProjectDropdown] = useState(false);
    const [amountDropdown, setAmountDropdown] = useState(false);
    
    const toggleDropdown = (type) => { 
        switch(type){ 
            case "project": 
                setProjectDropdown(!projectDropdown);
            break;
            case "amount":
            break;
        }
    }

    const selectProject = (id) => { 
        setProject(id);
        setProjectDropdown(false);
    }

    return ( 
        <Overlay display={props.display}>
            <Close src="close.svg" onClick={props.close} />
            <TextDetail>
                <h1>Donate</h1>
            <Content>
                <SubContent>
                    <p>
                        When you support TerreForm, you fuel the fight to protect people 
                        and the planet over corporate profits. Together, we’re working to 
                        build a system that promotes clean energy and solutions to climate change. 
                        We’re fighting for a truly safe and healthy food system. 
                    </p>
                    <h2> Select the project you would like to donate to. </h2>
                        <Dropdown onClick={()=> {toggleDropdown("project")}} >Project</Dropdown>
                        <DropdownItems display={projectDropdown}>
                            {projects.map((project)=>{ 
                                return <DropdownItem onClick={() => {selectProject.call(null, project.id)}}>{project.title}</DropdownItem>
                            })}
                        </DropdownItems>
                    <h2> Select how much you wish to donate. </h2>
                        <Dropdown onClick={()=> {toggleDropdown("project")}} >Project</Dropdown>
                            <DropdownItems display={projectDropdown}>
                            {/* give a list */}
                            </DropdownItems>
                    
                </SubContent>
                <h1>Make A Payment</h1>
                    <SubContent>
                    <DonateForm id={project} amountArr={[]} setStatus={'default'} staticPage={true} />
                    </SubContent>
                    
            </Content>
            </TextDetail>
        </Overlay> 
    );

}

export default StaticDonate;
