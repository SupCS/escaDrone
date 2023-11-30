import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './ContactsPage.css';

function MyNewPage() {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="contacts-container">
                    <div className="contacts__header">
                        <h1>Зворотній зв’язок</h1>
                    </div>
                    <div className="contacts-content">
                        <div className="contacts-info">
                            <div className="phone">
                                <h3>Телефон</h3>
                                <p>+380500445612</p>
                            </div>
                            <div className="telegram">
                                <h3>Телеграм</h3>
                                <p>@SupCS</p>
                                <p>@yurii_q</p>
                                <p>@vigillliae</p>
                                <p>@dicantnik</p>
                                <p>@DasPanzerschieff</p>
                            </div>
                        </div>
                        <div className="contacts-form">
                            <h3>Пропозиції та запитання</h3>
                            <input type="text" placeholder="Ім'я" />
                            <input type="email" placeholder="Електронна адреса" />
                            <textarea class="area" placeholder="Ваше повідомлення"></textarea>
                            <button type="submit">Відправити</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MyNewPage;
