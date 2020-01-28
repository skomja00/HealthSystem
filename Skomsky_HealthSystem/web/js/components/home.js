/**
 * Home content 
 */
function home(targetId) {
    var content = `
    <ul class="list" id="content-list">
        <li class="list-item" id="svcs">
            <span class="list-item-title">Services</span>
            <img class="list-item-image" 
                 src="pics/med-svcs.jpg" alt=""/>                
        </li>
        <li class="list-item" id="busofc">
            <span class="list-item-title">Business Office</span>
            <img class="list-item-image" 
                src="pics/bus-offc.jpg" alt=""/>
        </li>
        <li class="list-item" id="docs">
            <span class="list-item-title">Documents</span>
            <img class="list-item-image" 
                src="pics/statements.jpg" alt=""/>
        </li>
        <li>
            <div class="mission" id="mission">
                <span class="mission-flyover" id="mission-flyover">Our Mission</span>
                <p>
                    <img class="mission-icon" id="" src="icons/dark/icon-mission-H300.png" />
                    Health Systems simplifies health care and focuses on financial 
                    accountability. Health Services and the resulting charges can 
                    be overwhelming. The Health Systems work flow provided by our 
                    Business Office eases the complicated payments and 
                    adjustments process following a health care episode. 
                    Our Document Management system provides access and 
                    standardization of patient records. Email 
                    <a href="mailto:tun49199@temple.edu">tun49199@temple.edu</a>
                    to find out more.
                </p>
            </div>
        </li>
    </ul>`;
    document.getElementById(targetId).innerHTML = content;
}

