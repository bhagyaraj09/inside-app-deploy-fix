import Title from '@/components/ui/title'
import Container from '@/components/ui/container'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardFooter
} from '@/components/ui/card'

export default function Contact() {
  return (
    <>
      <Title title="Contact"></Title>
      <Container className='flex flex-wrap'>
        <Card className='m-2 sm:w-96'>
          <CardContent className="grid pt-6">
            <Image src="/team/Adam_Carbone.png" alt="team_image" width={384} height={256}/>
          </CardContent>
          <CardFooter className='flex-col'>
          <div className="text-xl font-bold">Adam Carbone</div>
            <div className="text-xs text-muted-foreground">
              <i className="fa-solid fa-at mr-1"></i>adam.carbone@symphonize.com
            </div>
          </CardFooter>
        </Card>
        <Card className='m-2 sm:w-96'>
          <CardContent className="grid pt-6">
            <Image src="/team/Ashok_Cherukuri.png" alt="team_image" width={384} height={256}/>
          </CardContent>
          <CardFooter className='flex-col'>
          <div className="text-xl font-bold">Ashok Cherukuri</div>
            <div className="text-xs text-muted-foreground">
              <i className="fa-solid fa-at mr-1"></i>ashok@symphonize.com
            </div>
          </CardFooter>
        </Card>
        <Card className='m-2 sm:w-96'>
          <CardContent className="grid pt-6">
            <Image src="/team/Cenk_Tuncbilek.jpg" alt="team_image" width={384} height={256}/>
          </CardContent>
          <CardFooter className='flex-col'>
            <div className="text-xl font-bold">Cenk Tuncbilek</div>
            <div className="text-xs text-muted-foreground">
              <i className="fa-solid fa-at mr-1"></i>cenk.tuncbilek@symphonize.com
            </div>
          </CardFooter>
        </Card>
        <Card className='m-2 sm:w-96'>
          <CardContent className="grid pt-6">
          <Image src="/team/Charlie_Szczygiel.jpg" alt="team_image" width={384} height={256}/>
          </CardContent>
          <CardFooter className='flex-col'>
            <div className="text-xl font-bold">Charlie Szczygiel</div>
            <div className="text-xs text-muted-foreground">
              <i className="fa-solid fa-at mr-1"></i>charlie.szczygiel@symphonize.com
            </div>
          </CardFooter>
        </Card>
        <Card className='m-2 sm:w-96'>
          <CardContent className="grid pt-6">
          <Image src="/team/Chris_Myers.png" alt="team_image" width={384} height={256}/>
          </CardContent>
          <CardFooter className='flex-col'>
            <div className="text-xl font-bold">Chris Myers</div>
            <div className="text-xs text-muted-foreground">
              <i className="fa-solid fa-at mr-1"></i>chris.myers@symphonize.com
            </div>
          </CardFooter>
        </Card>
        <Card className='m-2 sm:w-96'>
          <CardContent className="grid pt-6">
          <Image src="/team/Christopher_Bibbs.png" alt="team_image" width={384} height={256}/>
          </CardContent>
          <CardFooter className='flex-col'>
            <div className="text-xl font-bold">Christopher Bibbs</div>
            <div className="text-xs text-muted-foreground">
              <i className="fa-solid fa-at mr-1"></i>christopher.bibbs@symphonize.com
            </div>
          </CardFooter>
        </Card>        
        <Card className='m-2 sm:w-96'>
          <CardContent className="grid pt-6">
          <Image src="/team/Emily_Butler.png" alt="team_image" width={384} height={256}/>
          </CardContent>
          <CardFooter className='flex-col'>
            <div className="text-xl font-bold">Emily Butler</div>
            <div className="text-xs text-muted-foreground">
              <i className="fa-solid fa-at mr-1"></i>emily.butler@symphonize.com
            </div>
          </CardFooter>
        </Card>
        <Card className='m-2 sm:w-96'>
          <CardContent className="grid pt-6">
          <Image src="/team/Kathleen_Dergis.jpg" alt="team_image" width={384} height={256}/>
          </CardContent>
          <CardFooter className='flex-col'>
            <div className="text-xl font-bold">Kathleen Dergis</div>
            <div className="text-xs text-muted-foreground">
              <i className="fa-solid fa-at mr-1"></i>kathleen.dergis@symphonize.com
            </div>
          </CardFooter>
        </Card>
        <Card className='m-2 sm:w-96'>
          <CardContent className="grid pt-6">
          <Image src="/team/Katie_Fogleboch.jpeg" alt="team_image" width={384} height={256}/>
          </CardContent>
          <CardFooter className='flex-col'>
            <div className="text-xl font-bold">Katie Fogleboch</div>
            <div className="text-xs text-muted-foreground">
              <i className="fa-solid fa-at mr-1"></i>katie.fogleboch@symphonize.com
            </div>
          </CardFooter>
        </Card>
        <Card className='m-2 sm:w-96'>
          <CardContent className="grid pt-6">
          <Image src="/team/Kyle_Feliks.jpg" alt="team_image" width={384} height={256}/>
          </CardContent>
          <CardFooter className='flex-col'>
            <div className="text-xl font-bold">Kyle Feliks</div>
            <div className="text-xs text-muted-foreground">
              <i className="fa-solid fa-at mr-1"></i>kyle.feliks@symphonize.com 
            </div>
          </CardFooter>

        </Card>        
        <Card className='m-2 sm:w-96'>
          <CardContent className="grid pt-6">
            <Image src="/team/Natalia_Babicheva.jpg" alt="team_image" width={384} height={256}/>
          </CardContent>
          <CardFooter className='flex-col'>
            <div className="text-xl font-bold">Natalia Babicheva</div>
            <div className="text-xs text-muted-foreground">
              <i className="fa-solid fa-at mr-1"></i>natalia.babicheva@symphonize.com
            </div>
          </CardFooter>
        </Card>
        <Card className='m-2 sm:w-96'>
          <CardContent className="grid pt-6">
            <Image src="/team/Ray_Sewell.png" alt="team_image" width={384} height={256}/>
          </CardContent>
          <CardFooter className='flex-col'>
            <div className="text-xl font-bold">Ray Sewell</div>
            <div className="text-xs text-muted-foreground">
              <i className="fa-solid fa-at mr-1"></i>ray.sewell@symphonize.com
            </div>
          </CardFooter>
        </Card>
        <Card className='m-2 sm:w-96'>
          <CardContent className="grid pt-6">
          <Image src="/team/Ryan_Levin.png" alt="team_image" width={384} height={256}/>
          </CardContent>
          <CardFooter className='flex-col'>
            <div className="text-xl font-bold">Ryan Levin</div>
            <div className="text-xs text-muted-foreground">
              <i className="fa-solid fa-at mr-1"></i>ryan.levin@symphonize.com
            </div>
          </CardFooter>
        </Card>
        <Card className='m-2 sm:w-96'>
          <CardContent className="grid pt-6">
          <Image src="/team/Sreedhar_Tatavarthi.png" alt="team_image" width={384} height={256}/>
          </CardContent>
          <CardFooter className='flex-col'>
            <div className="text-xl font-bold">Sreedhar Tatavarthi</div>
            <div className="text-xs text-muted-foreground">
              <i className="fa-solid fa-at mr-1"></i>sreedhar.tatavarthi@symphonize.com
            </div>
          </CardFooter>
        </Card>
        <Card className='m-2 sm:w-96'>
          <CardContent className="grid pt-6">
          <Image src="/team/Sridhar_Tirumala.png" alt="team_image" width={384} height={256}/>
          </CardContent>
          <CardFooter className='flex-col'>
            <div className="text-xl font-bold">Sridhar Tirumala</div>
            <div className="text-xs text-muted-foreground">
              <i className="fa-solid fa-at mr-1"></i>sridhar@symphonize.com
            </div>
          </CardFooter>
        </Card>
        <Card className='m-2 sm:w-96'>
          <CardContent className="grid pt-6">
          <Image src="/team/Venkata_Nagireddy.png" alt="team_image" width={384} height={256}/>
          </CardContent>
          <CardFooter className='flex-col'>
            <div className="text-xl font-bold">Venkata Nagireddy</div>
            <div className="text-xs text-muted-foreground">
              <i className="fa-solid fa-at mr-1"></i>venkata.nagireddy@symphonize.com
            </div>
          </CardFooter>
        </Card>
        <Card className='m-2 sm:w-96'>
          <CardContent className="grid pt-6">
          <Image src="/team/Zac_Walker.jpg" alt="team_image" width={384} height={256}/>
          </CardContent>
          <CardFooter className='flex-col'>
            <div className="text-xl font-bold">Zac Walker</div>
            <div className="text-xs text-muted-foreground">
              <i className="fa-solid fa-at mr-1"></i>zac.walker@symphonize.com
            </div>
          </CardFooter>
        </Card>
      </Container>
    </>
  )
}
