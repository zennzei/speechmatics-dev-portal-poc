import Head from 'next/head';


function Index({}) {
    const chargifyForm = useRef();
    const chargify = useRef(new window.Chargify());

    const [token, setToken] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    
        chargify.current.token(
          chargifyForm.current,
    
          (token) => {
            console.log('{host} token SUCCESS - token: ', token);
            setToken(token);
          },
    
          (error) => {
            console.log('{host} token ERROR - err: ', error);
          }
        );
      }

    useEffect(
    () => {
        chargify.current.load({
        // selector where the iframe will be included in the host's HTML (i.e. '#chargify-form')
        // optional if you have a `selector` on each and every field
        selector: '#chargify-form',

        // (i.e. '1a2cdsdn3lkn54lnlkn')
        publicKey: 'chjs_ycbc7hctjthpy6qbxxxgjtfd',

        // form type (possible values: 'card' or 'bank')
        type: 'card',

        // points to your Chargify site
        serverHost: 'http://speechmatics-3.chargify.com/'
        });

        return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(
    () => {
        chargify.current.load({type: paymentType});
        setToken('');

        return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        chargify.current.unload();
        };
    }, [chargify]);

    return <div>
        <Head>
            <script src="https://js.chargify.com/latest/chargify.js"></script>
        </Head>
        <div>hello</div>
        <form onSubmit={handleSubmit} ref={chargifyForm}>
            <div id="chargify-form"></div>

            <label>
                Hidden Token: <input id="host-token" disabled value={token}/>
                <input id="reference" disabled value={'client1'} />
            </label>
            <p>
                <button type="submit">Submit Host Form</button>
            </p>
        </form>
    </div>
}


export default Index;