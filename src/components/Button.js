import styled from "styled-components";



//styled-components ---> create a component Buttoncontainer - a styled button html item
//can place styled-component into separate js file and use the component for any project

//syntax for styled-components below
//focus - removes the blue edging when the button has been clicked and is in focus
//hover - changes the color on hovering
//transition - makes it a smooth change for 0.5 seconds rather than straight away

//${} syntax changes color depending on whether the 'cart' prop is included
//in the specific ButtonContainer 
export const ButtonContainer = styled.button`
text-transform: capitalize;
font-size: 1.4rem;
background: transparent;
border: 0.05rem solid var(--lightBlue);
border-color:${props => 
    props.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
color:${prop => prop.cart  ? "var(--mainYellow)" : "var(--lightBlue)"};
border-radius: 0.5rem;
padding: 0.2 rem 0.5 rem;
cursor: pointer;
margin: 0.2rem 0.5rem 0.2rem 0.5rem;
transition: all 0.5s ease-in-out;
&:hover{
background:${prop => prop.cart  ? "var(--mainYellow)" : "var(--lightBlue)"};
color:var(--mainBlue);
}
&:focus{
outline:none;
}  
`