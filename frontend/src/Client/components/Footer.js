import "../styles/Footer.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer(){
    return(
        <footer className="footer">
            <p>&copy; 2025 Art Gallery. All rights reserved.</p>
            <div className="footer-links">
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
                <a href="/contact">Contact Us</a>
            </div> 
            
            <div className="social-links">
                <a href="https://facebook.com"><FacebookIcon/></a>
                <a href="https://twitter.com"><XIcon/></a>
                <a href="https://instagram.com"><InstagramIcon/></a>
            </div>
        </footer>
    );
}

export default Footer;