import axios from 'axios'
import toast from 'react-hot-toast'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useLoaderData, useActionData, Form, useSubmit, redirect, useSearchParams } from 'react-router-dom'


import { buy as vbuy } from '@/vcommerce/stores/vcommerce'
// import BasePage from './BasePage'
import BasePage from '@/views/BasePage'

import { GameConfig } from '@/fantasy/compos/GameConfig'
import { PlayerList, AddPlayerForm } from '@/fantasy/compos'

import rpgdata from '@/fantasy/data/players.json'
import { fetchServerTime, loadQuests } from '@/fantasy/stores/fantasy'

import QuestsListActive from '@/fantasy/compos/game/QuestsListActive'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { questCompleted, reroll4 } from '@/requests'
import * as Requests from '@/requests'

import { useFantasyContext } from '@/fantasy/context'

import Button from 'react-bootstrap/Button'
import { 
  Container, 
  Col, 
  Row , 
  Stack , 
  Form as BsForm, 
  Badge,
  Spinner,
  Modal,
  Offcanvas as Sidebar,
  Alert

} from 'react-bootstrap'

import { useForm } from 'react-hook-form'
import NewPlayerForm from '@/fantasy/views/forms/NewPlayerForm'

export default function Home()
{
  const [ players, setPlayers ] = useState( rpgdata );

  const dummy = { name: 'elias', level: 12, classe:'architect' }
  const vcommerceDispatch = useDispatch()
  const dispatch = useDispatch()
  const {status:server_status, errors:server_error, players:server_players } = useSelector( state => state.fantasy )

  const fantasyContext = useFantasyContext()
  //console.info('fantasy context is ', fantasyContext )

  const onlinePlayerAgain = useLoaderData()
  //console.info('from router loader data ', onlinePlayerAgain)
  const lastCreatedPlayer = useActionData()
  //console.info('last created player was ', lastCreatedPlayer)

  useEffect(()=>{
    console.log('HOME MOUNTED!')
    return ()=>{
      console.log('HOME UNMOUNTED!')
    }
  }, [])

  useEffect(()=>{
  	const getPlayers = async () =>{
  		const players = await axios.get('apis/player/online')
  		//console.log( players.data )


  		toast.success('online players data loaded')

      // const server_time = await axios.get('apis/server/time')
      // console.info( server_time.data )
  	}

    dispatch( fetchServerTime() )
  	// getPlayers()

  }, [ dispatch , status ])


  const onAddPlayer = (newPlayerData) =>{
    // console.info('App::onAddPlayer called ', newPlayerData )
    const newPlayers = [ ...players, newPlayerData ]
    // sort by level desc
    // newPlayers.sort( (a, b) => a.level < b.level )
    setPlayers( newPlayers )
  }


  const onBuy = ( coin, price ) =>{
    //console.info(`Customer will buy item with coin ${coin} and price ${price} `)

    vcommerceDispatch( vbuy({ coin, price }) )
  }



  const queryClient = useQueryClient()

  const questMutation = useMutation({
    mutationFn: questCompleted,
    onMutate: (variables) =>{
      //console.info( `from ONMUTATE ${ variables }`)
      return { secret: 'é biscoito e não bolacha'}
    },
    onSuccess: (data, variables, context) =>{
      //console.info( `from ONSUCCESS `, data, variables, context )
      toast.success('quest completed!!')
      queryClient.invalidateQueries({ queryKey:['quests', 'active']})
    },
    onError: (error, variables, context ) =>{
      //console.info( `from ONERROR `, error.message, variables, context )
      toast.error('you must kill the boss to complete the quest')
    }
  })

  const reroll4Mutation = useMutation({
    mutationFn: reroll4,
    onSuccess: (response) => {
      //console.info('GLOBAL REROLL4 MUTATION SUCCESS ', response.data )
    },
    onError: (error) =>{
      //console.info('GLOBAL REROLL4 MUTATION ERROR ', error.message )
    }

  })

  const onQuestCompleted = ( questId ) =>{
    //console.info('some quest is about to be completed ', questId )
    questMutation.mutate( questId )
  }

  const rerollBuilder = (idx) =>{
    return reroll4Mutation.mutateAsync(42, {
      onSuccess: (response) =>{
        toast.success(`Reroll #${idx} have success`) 
      }
    })
  }


  const onReroll = async () =>{
    const indexes = [1,11,21,31]
    await Promise.all( indexes.map( (idx) => rerollBuilder(idx) ))
  }

  const submit = useSubmit()
  const onSubmitNewPlayer = (evt) =>{
    evt.preventDefault()
    const fdata = new FormData( evt.target )
    evt.target.reset()
    submit( fdata, { method: 'post' , action:'/game'})
  }

  const bsFormSubmit = (evt) =>{
    evt.preventDefault()
    console.info( evt.target )
    const fdata = new FormData( evt.target )
    console.log( Object.fromEntries(fdata) )
    console.log( fdata )
  }

  const [ searchParams, setSearchParams ] = useSearchParams()
  // searchParams.set('animal', 'candanho')
  // setSearchParams( searchParams )

  const changeQuery = (animal) =>{
    searchParams.set('animal', animal)
    setSearchParams( searchParams )
  }
    const [ toggleModal, setToggleModal ] = useState( false )
    const [ toggleSidebar, setToggleSidebar ] = useState( false )
    
    const showModal = () =>{
      setToggleModal( tm => tm=!tm )
      console.info( toggleModal )
    }

    const showSidebar = () =>{
      setToggleSidebar( ts => ts=!ts )
      console.info( toggleSidebar )
    }

    

  	return <BasePage>
		<div className='p-2 text-bg-success' style={ { marginBottom: '1rem' } }>
			<span>This is home { dummy?.classe?.toUpperCase() ?? 'nada'.toUpperCase() }</span>
      <span className='text-bg-primary mx-2 px-3 py-1 rounded'>{ server_status } </span>
      { server_error && 
        <span className='text-bg-danger mx-2 px-3 py-1 rounded'>{ server_error }</span>
      }
		</div>


    <QuestsListActive onComplete={ onQuestCompleted } />



    <Alert variant='danger' className='w-75 mx-auto'>some secret message to you</Alert>

    <Modal 
      show={toggleModal} 
      onHide={ showModal} 
      backdrop='static' 
      keyboard={false} 
      size='lg'
      centered 
      fullscreen='md-down' 
      contentClassName='bg-danger' 
      backdropClassName='bg-primary' 
      dialogClassName='' 
    >
      <Modal.Header className='text-bg-primary' closeButton>
        <Modal.Title>Modal Gitano</Modal.Title>
      </Modal.Header>
      <Modal.Body  className='' style={{ minHeight: '40vw'}}>
        <Container className=''>
          <Row className='text-center gap-3 mb-2'>
            <Col className='border'>some 1-1</Col>
            <Col className='border'>some 1-2</Col>
          </Row>
          <Row className=' gap-3 mb-2'>
            <Col className='border'>some 2-1</Col>
            <Col className='border'>some 2-2</Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer className='text-bg-dark' >
        <Button variant='danger' onClick={ showModal }>Fechar</Button>
        <Button variant='success' onClick={ showModal } >Concordar</Button>
      </Modal.Footer>
    </Modal>




    <Sidebar placement='bottom' show={ toggleSidebar} onHide={ showSidebar } className='text-bg-dark'>
      <Sidebar.Header className='text-bg-warning' closeButton>
        <Sidebar.Title className='text-center w-100'>
          <span>nação cigana e talz</span>
        </Sidebar.Title>
      </Sidebar.Header>
      <Sidebar.Body className='d-flex align-items-center justify-content-around flex-column'>

          <div className='text-bg-success p-3'>Some winner content #1</div>
          <div className='text-bg-success p-3'>Some winner content #2</div>
          <div className='text-bg-success p-3'>Some winner content #3</div>
      </Sidebar.Body>
      
    </Sidebar>


    <div className='text-bg-dark my-2 p-3'>
      <Spinner animation='border' role='status' className='mx-2' size='md'></Spinner>
      <Spinner animation='grow' role='status' className='mx-2'></Spinner>
      <Spinner animation='grow' role='status' className='mx-2' variant='primary'></Spinner>
      <Spinner animation='grow' role='status' className='mx-2' variant='danger' size='sm'></Spinner>
      

      <Button variant='warning' onClick={ showModal }>
        <Spinner as='span' animation='grow' role='status' className='me-2' variant='dark' size='sm'></Spinner>

        <span>show modal</span>
      </Button>

      <Button variant='success' className='mx-2' onClick={ showSidebar }>
        <Spinner as='span' animation='grow' role='status' className='me-2' variant='light' size='sm'></Spinner>

        <span>show sidebar</span>
      </Button>




    </div>

    <NewPlayerForm />



    <div className='text-bg-warning p-2'>
      { searchParams.get('animal') || 'no animal' }
    </div>
    <div className='mx-auto w-75 border rounded p-2 my-2 d-flex justify-content-around'>
      <Button variant='warning' size='sm' onClick={ () => changeQuery('raposa')}>change to raposa</Button>
      <Button variant='warning' size='sm' onClick={ ()=> changeQuery('galego')}>change to galego</Button>
      <Button variant='warning' size='sm' onClick={ ()=> changeQuery('pelego')}>change to pelego</Button>
    </div>

    <BsForm className='container p-2 mb-3 rounded' onSubmit = { bsFormSubmit } encType='multipart/form-data'>
      <fieldset>
        <BsForm.Group className='mb-3' controlId='emailRow'>
          <BsForm.Label>Email here dude !</BsForm.Label>
          <BsForm.Control size='lg' type='email' placeholder='some valid email dude' required plaintext readOnly defaultValue='alepo@domain.com'  className='text-light' name='email' />
          <BsForm.Text className='text-danger'>um email tipo email@domain.com</BsForm.Text>
        </BsForm.Group>
        
        <BsForm.Group className='mb-3' controlId='passwordRow'>
          <BsForm.Label>Password here dude !</BsForm.Label>
          <BsForm.Control size='sm' type='password' defaultValue='admin12345' required name='password'/>
          <BsForm.Text className='text-danger'>sua senha gajo!</BsForm.Text>
        </BsForm.Group>

        <BsForm.Group className='mb-3' controlId='termsRow'>
          <BsForm.Check type='checkbox' label='concorde com os termos de serviço' name='termos' defaultChecked={true} required/>
        </BsForm.Group>
        
        <BsForm.Group className='mb-3' controlId='termsReloadedRow'>
          <BsForm.Check type='checkbox' name='termos-reloaded'>
            <BsForm.Check.Input type='checkbox' />
            <BsForm.Check.Label>
              <span>li e concordo com os </span>
              <Button variant='primary' size='sm'>Termos de serviço</Button>
            </BsForm.Check.Label>
          </BsForm.Check>
        </BsForm.Group>



        <BsForm.Group className='mb-3' controlId='tobaRow'>
          <BsForm.Switch label='vc vai dar o toba?' name='toba' defaultChecked={true} required/>
        </BsForm.Group>

        <BsForm.Group className='mb-3' controlId='termsRow'>
          <BsForm.Control name='imgid' type='file' size='lg' accept='image/*' required />
        </BsForm.Group>

        <BsForm.Group className='mb-3' controlId='mediunsRow'>
          <BsForm.Select name='medium' size='lg' required>
            <option disabled>select a medium</option>
            <option value='yago'>yago</option>
            <option value='rosa'>rosa</option>
            <option value='guilherme'>guilherme</option>
          </BsForm.Select>
        </BsForm.Group>
        

        <div className='p-2 d-flex'>
          <Button className='ms-auto' variant='outline-success' type='submit' >Dar login parsa</Button>
        </div>
      </fieldset>
    </BsForm>

    <div className='d-flex justify-content-around p-3 border'>
      <Button variant='primary' className='w-50'>Primary</Button>
      <Button variant='warning'>Warning</Button>
      <Button variant='success'>Danger</Button>
    </div>

    <Stack gap={1} direction='horizontal' className='my-3 border border-danger border-3 col-sm-5 mx-auto'>
      <div className='p-2 border rounded'>Some one</div>
      <div className='p-2 border rounded ms-auto'>Some two</div>
      <div className='p-2 border rounded'>Some three</div>      
    </Stack>

    <Container className='my-3 border border-2 rounded overflow-hidden text-center' fluid='sm'>
      <Row className='text-bg-success p-2 gap-2'>
        <Col className='border'>one</Col>
        <Col className='border'>two</Col>
        <Col className='border'>three</Col>
      </Row>
      <Row className='text-bg-light p-2'>
        <Col md='auto'>one</Col>
        <Col sm='auto' className='text-bg-dark'>two</Col>
        <Col>three</Col>
      </Row>


    </Container>



    { lastCreatedPlayer && (
        <div className='container border border-3 p-4 my-3 rounded'>
          <div className='row col'>
            <span>
              Last created character was
              <span className='mx-2 text-warning'>{ lastCreatedPlayer.name }</span>
              classe 
              <span className='mx-2 text-primary'>{ lastCreatedPlayer.classe }</span>
            </span>
          </div>
        </div>
    )}

    <Form method='post' className='container' onSubmit={ onSubmitNewPlayer }>
      
      <div className='row col mb-1'>
        <input type='text' placeholder='your character name' name='name' />
      </div>

      <div className='row col mb-1'>
        <select name='classe' className='form-input'>
          <option defaultValue={-1} disabled>select a classe</option>
          { fantasyContext.classes.map( (classename, idx) =>{
            return (
              <option key={idx} value={classename}>{ classename }</option>
            )
          })}
        </select>
      </div>

      <div className='row col'>
        <button type='submit' name='intent' value='create' className='btn btn-primary'>create character</button>
      </div>
    </Form>

		<div className='container'>

      <div className='row my-4'>
        <div className='col text-center'>
          <button className='btn btn-danger p-2 w-50' onClick={ onReroll }>Reroll4</button>
        </div>
      </div>


      



          <div className='container border border-3 border-warning'>
            
            <div className='row p-2'>
              <div className='col'>
                <span className='fs-3'>V Shopping</span>
              </div>
            </div>  

            <div className='row p-2'>
              
              <div className='col'>
                <button type='button' className='btn btn-warning' onClick={() => onBuy('golden', 10) }>buy a golden 10 item</button>
              </div>

              <div className='col'>
                <button type='button' className='btn btn-light' onClick={() => onBuy('marfin', 10) }>buy a marfin 10 item</button>
              </div>
              
              <div className='col'>
                <button type='button' className='btn btn-warning' onClick={() => onBuy('golden', 22) }>buy a golden 22 item</button>
              </div>
              
              
            </div>



          </div>
	        
          <GameConfig />
          
          <PlayerList players={server_players.online} /> 
	        <AddPlayerForm onAddPlayer = {(newPlayerData) => onAddPlayer( newPlayerData )} roomType='free' />
        </div>
      
	</BasePage>
}

/*
export async function loader({ request, params })
{
  const response = await Requests.onlinePlayers()
  const payload = response.data.payload.sort( (a,b) => a.classe.level < b.classe.level ) 
  // throw new Response('fudeu', { status: 503 } )
  return payload
}

export async function action({ request, params })
{
  const fdata = await request.formData()
  const data = Object.fromEntries( fdata )

  console.info('ACTION catched data ', data )
  data.name += ' gandra'
  // return data 
  return redirect('/game')
}
*/