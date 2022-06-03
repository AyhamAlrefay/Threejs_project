

class Body
{
      xPos, yPos, mass, xVel, yVel, xFor, yFor;
     static   GRAVITY = 6.673e-11;
     Color c;
      radius;
       BOTTOM = 870;
       LEFT_WALL = 0;
       RIGHT_WALL = 1093;
       TOP = 0;
      counter;
     Shape shape;
     boolean deleteMe;

    Body( xPos,  yPos,  mass,  xVel,  yVel, Color c)
    {
        this.xPos = xPos;
        this.yPos = yPos;
        this.mass = mass;
        this.xVel = xVel;
        this.yVel = yVel;
        this.c = c;
        this.radius = this.calcRadius(this.mass);        
        counter = 0;
        deleteMe = false;
    }
    
      getAngle()
    {
         result = ((Math.atan2(yVel, xVel)) / (Math.PI/180));
        
        if(result < 0)
        {
            return 360 + result;
        }
        return result;
    }
    
      distTo(Body otherBody)
    {
         dx = xPos - otherBody.getxPos();
         dy = yPos - otherBody.getyPos();
        return Math.sqrt((dx * dx) + (dy * dy));
    }
    
drawBody(Graphics g)
    {
        Graphics2D g2d = (Graphics2D) g.create();
        g2d.setColor(c);
        shape = new Ellipse2D.Float((float)xPos - radius,(float) yPos - radius, radius, radius);
        
        g2d.fill(shape);
        g2d.dispose();
    }
    
   getArea()
    {
        return Math.PI * radius * radius;
    }
    
    @Override
     String toString()
    {
        StringBuilder sb = new StringBuilder();
        sb.append(String.format("Area: %f ", this.getArea()));
        sb.append(String.format("Angle: %f ", this.getAngle()));
        sb.append(String.format("x: %f, y: %f\n", xPos, yPos));
        return sb.toString();
    }
    
     update()
    {
        counter++;
        xVel += counter * xFor / mass;
        yVel += counter * yFor / mass;
        
        xPos -= counter * xVel;
        yPos -= counter * yVel;
    }
    
     resetForce()
    {
        xFor = 0;
        yFor = 0;
    }
    ؤ
    
    boolean isOut()
    {
        if(xPos > RIGHT_WALL || xPos < LEFT_WALL || yPos > BOTTOM || yPos < TOP)
        {
            return true;
        }
        return false;
    }
    
      addForce(Body otherBody)
    {
         soften = 143;
         dx = xPos - otherBody.getxPos();
         dy = yPos - otherBody.getyPos();
        
         dist = Math.sqrt((dx * dx) + (dy * dy));
        
         force = (GRAVITY * this.mass * otherBody.getMass()) / (dist * dist + soften * soften);
        
        xFor += (force * dx / dist);
        yFor += force * dy / dist;
    }
    
     collide(Body otherBody)
    {   
        this.xVel = (((this.mass * this.xVel) + (otherBody.mass * otherBody.xVel)) / ( this.mass + otherBody.mass));
        this.yVel = (((this.mass * this.yVel) + (otherBody.mass * otherBody.yVel)) / ( this.mass + otherBody.mass));
        
        System.out.prf("Old mass: %.2f Old Radius: %d\n", this.mass, this.radius);
        this.mass += otherBody.mass;
        if(this.radius < 20)
        {
            this.radius = this.calcRadius(this.mass);
        }
        System.out.prf("New mass: %.2f New Radius: %d\n", this.mass, this.radius);
        System.out.prf("xVel: %f yVel: %f\n", this.xVel, this.yVel);
    }
    
 deleteThis()
    {
        System.out.prln(this.toString());
        this.deleteMe = true;
    }
    
     calcRadius( mass)
    {
         result = 0;
        
        if(mass < 100000)
        {
            result = 4;
        }else if(mass < 500000)
        {
            result = 6;
        }else if(mass < 1000000)
        {
            result = 8;
        }else if(mass < 5000000)
        {
            result = 10;
        }else if(mass < 10000000)
        {
            result = 12;
        }else if(mass < 20000000)
        {
            result = 14;
        }else
        {
            result = 16;
        }
        
        return result;
    }

    //<editor-fold defaultstate="collapsed" desc="Getter and setter crap">
    setDeleteMe(boolean deleteMe)
    {
        this.deleteMe = deleteMe;
    }
    
    boolean getDeleteMe()
    {
        return deleteMe;
    }
    
 setShape(Shape shape)
    {
        this.shape = shape;
    }
    
     Shape getShape()
    {
        return this.shape;
    }
    
    getxPos()
    {
        return xPos;
    }
    
   setxPos( xPos)
    {
        this.xPos = xPos;
    }
    
      getyPos()
    {
        return yPos;
    }
    
      setyPos( yPos)
    {
        this.yPos = yPos;
    }
    
      getMass()
    {
        return mass;
    }
    
      setMass( mass)
    {
        this.mass = mass;
    }
    
      getxVel()
    {
        return xVel;
    }
    
      setxVel( xVel)
    {
        this.xVel = xVel;
    }
    
      getyVel()
    {
        return yVel;
    }
    
      setyVel( yVel)
    {
        this.yVel = yVel;
    }
    
      getxFor()
    {
        return xFor;
    }
    
     void setxFor( xFor)
    {
        this.xFor = xFor;
    }
    
      getyFor()
    {
        return yFor;
    }
    
      setyFor( yFor)
    {
        this.yFor = yFor;
    }
    
     Color getC()
    {
        return c;
    }
    
     void setC(Color c)
    {
        this.c = c;
    }
    
      getRadius()
    {
        return radius;
    }
    
     void setRadius( radius)
    {
        this.radius = radius;
    }
    //</editor-fold>
}








 class Frame extends JFrame
{

     Canvas canvas;
     BufferStrategy buffer;
     Body b;
     Space space;
     boolean switcher;
      i = 0;

     Frame()
    {
        super();
        switcher = false;
        space = new Space();
         Random rand = new Random();
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setMinimumSize(new Dimension(1100, 900));
        this.setResizable(false);
        this.setIgnoreRepa(true);

        canvas = new Canvas();

        this.getContentPane().add(canvas);
        this.setLocationRelativeTo(null);

        canvas = new Canvas();
        canvas.setIgnoreRepa(true);
        canvas.setBackground(Color.white);
        this.getContentPane().add(canvas);
        this.setVisible(true);

        canvas.createBufferStrategy(2);
        buffer = canvas.getBufferStrategy();

        canvas.addMouseListener(new MouseAdapter()
        {
            @Override
              mousePressed(MouseEvent e)
            {
                if (e.getButton() == 1)
                {
                    for ( j = 0; j < 200; j++)
                    {
                        space.addBody(0, 0);
                    }
                } else if (e.getButton() == 3)
                {
                    if (switcher)
                    {
                        switcher = false;
                    } else
                    {
                        switcher = true;
                        i = 0;
                    }
                    System.out.prln(switcher);
                } else
                {
                    space.delAll();
                    System.out.prln(space.getSize());
                }
            }
        });
    }

    render()
    {
        do
        {
            do
            {
                Graphics2D g2d = (Graphics2D) buffer.getDrawGraphics();
                g2d.setColor(Color.BLACK);
                g2d.fillRect(0, 0, canvas.getWidth(), canvas.getHeight());
                renderParticles(g2d);
                g2d.dispose();
            } while (buffer.contentsRestored());
            buffer.show();
        } while (buffer.contentsLost());

    }

      renderParticles(Graphics2D g2d)
    {
        if (space.notEmpty())
        {
            space.drawAll(g2d);
        }
    }

      loop()
    {

        while (true)
        {


            if (switcher)
            {
                space.addForces();
            }
            space.update();
            render();

            space.resetAll();
            space.checkCollisionTwo();
            try
            {
                Thread.sleep(1000 / 60);
            } catch (erruptedException e)
            {
                System.out.prln("errupted Exception " + e);
            }
            space.deleteCrap();
        }
    }
}




/**
 *
 * @author Cypher
 */
 class Space
{
     List safeBodies;
      largeX = 0, largeY = 0;
    
     Space()
    {
        safeBodies = Collections.synchronizedList(new ArrayList<Body>());
        safeBodies.clear();
    }
    
    drawAll(Graphics2D g2d)
    {
        if(!this.safeBodies.isEmpty())
        {
            synchronized (safeBodies)
            {
                Iterator<Body> it = safeBodies.iterator();
                while(it.hasNext())
                {
                    Body body = it.next();
                    if(!body.getDeleteMe())
                    {
                        body.drawBody(g2d);
                        g2d.setColor(Color.red);
                        g2d.drawString(String.valueOf(largeX), 10, 10);
                        g2d.drawString(String.valueOf(largeY), 10, 30);
                    }
                }
            }
        }
    }
    
    addBody( x,  y)
    {
        Random rand = new Random();
        synchronized (safeBodies)
        {
            safeBodies.add(new Body(rand.next(1100), rand.next(900), 10000, 0, 0, Color.WHITE));
        }
    }
    
     boolean notEmpty()
    {
        if(safeBodies.isEmpty())
        {
            return false;
        }
        return true;
    }
    
 update()
    {
        if(!this.safeBodies.isEmpty())
        {
            synchronized (safeBodies)
            {
                Iterator<Body> it = safeBodies.iterator();
                while(it.hasNext())
                {
                    Body body = it.next();
                    if(!body.getDeleteMe())
                    {
                        body.update();
                        if(this.largeX <  body.getxVel())
                        {
                            this.largeX = body.getxVel();
                        }
                        if(this.largeY <  body.getyVel())
                        {
                            this.largeY = body.getyVel();
                        }
                    }
                    
                }
            }
        }
    }
    
    addForces()
    {
        synchronized(safeBodies)
        {
            for(Object a : safeBodies)
            {
                Body bodyOne = (Body) a;
                if(!bodyOne.getDeleteMe())
                {
                    for(Object b : safeBodies)
                    {
                        Body bodyTwo = (Body) b;
                        if(!bodyOne.equals(bodyTwo) && !bodyTwo.getDeleteMe())
                        {
                            bodyOne.addForce(bodyTwo);
                        }
                    }
                }
            }
        }
    }
    
    getSize()
    {
        return this.safeBodies.size();
    }
    
     delAll()
    {
        synchronized(safeBodies)
        {
            for ( i = 0; i < safeBodies.size(); i++)
            {
                safeBodies.remove(i);
            }
        }
    }
    
     resetAll()
    {
        synchronized(safeBodies)
        {
            for(Object a : safeBodies)
            {
                Body bodyOne = (Body) a;
                bodyOne.resetForce();
            }
        }
    }
    
 checkCollisionTwo()
    {
        Body bodyOne, bodyTwo;
        synchronized(safeBodies)
        {
            Iterator<Body> itOne = safeBodies.iterator();
            Iterator<Body> itTwo = safeBodies.iterator();
            
            for ( i = 0; i < safeBodies.size(); i++)
            {
                bodyOne = (Body) safeBodies.get(i);
                for ( j = 0; j < safeBodies.size(); j++)
                {
                    bodyTwo = (Body) safeBodies.get(j);
                    if(!bodyOne.equals(bodyTwo) && !bodyOne.getDeleteMe())
                    {
                        if((bodyOne.distTo(bodyTwo) < (bodyOne.getRadius() + bodyTwo.getRadius()) - 2) 
                                && bodyOne.getMass() > 0 
                                && bodyTwo.getMass() > 0)
                        {
                            if(bodyOne.getMass() > bodyTwo.getMass())
                            {
                                bodyOne.collide(bodyTwo);
                                bodyTwo.deleteThis();
                            }else
                            {
                                bodyTwo.collide(bodyOne);
                                bodyOne.deleteThis();
                            }
                        }
                    }
                }
            }
            
//            while(itOne.hasNext())
//            {
//                bodyOne = itOne.next();
//                while(itTwo.hasNext())
//                {
//                    bodyTwo = itTwo.next();
//                    if(!bodyOne.equals(bodyTwo))
//                    {
//                        if((bodyOne.distTo(bodyTwo) < bodyOne.getRadius() + bodyTwo.getRadius()) 
//                                && bodyOne.getMass() > 0 
//                                && bodyTwo.getMass() > 0)
//                        {
//                            bodyOne.collide(bodyTwo);
//                            bodyOne.deleteThis();
//                        }
//                    }
//                }
//            }
        }
    }
    
 deleteCrap()
    {
        synchronized(safeBodies)
        {
            for ( i = 0; i < safeBodies.size(); i++)
            {
                Body b = (Body) safeBodies.get(i);
                if(b.getDeleteMe())
                {
                    safeBodies.remove(i);
                }
            }
        }
    }
}